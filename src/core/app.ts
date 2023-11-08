import express from 'express'
import { ResultException } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Metadata } from '@esliph/metadata'
import { ObserverListener } from '@esliph/observer'
import { Server } from '@esliph/http'
import { Construtor } from '@@types/index'
import { ModuleConfig } from '@common/module/decorator'
import { isModule } from '@common/module'
import { METADATA_EVENT_CONFIG_KEY, METADATA_EVENT_HANDLER_KEY, METADATA_FILTER_CONFIG_KEY, METADATA_GUARD_CONFIG_KEY, METADATA_HTTP_ROUTER_HANDLER_KEY, METADATA_MODULE_CONFIG_KEY } from '@constants/index'
import { getMethodNamesByClass, isInstance } from '@util/index'
import { isFilter } from '@common/filter'
import { isGuard } from '@common/guard'
import { GuardConfig, FilterConfig } from '@common/module/decorator'
import console from 'console'

export class Application {
    static server = express()
    static serverLocal = new Server()
    private static listener = new ObserverListener()
    private static appModule: Construtor
    private static options: { serverLocal?: boolean }
    private static controllers: Construtor[]
    private static providers: any[]
    private static filters: {
        instance: any;
        class: any;
        metadata: FilterConfig;
    }[]

    static listen(port: number) {
        Application.server.listen(port, () => {
            console.log('Server running on port', port)
        })
    }

    static fabric(appModule: Construtor, options?: { serverLocal?: boolean }) {
        if (!isModule(appModule)) {
            throw new ResultException({ title: `Class "${appModule.name}" is not a module`, message: `Apply decorator "Module" in class "${appModule.name}"` })
        }

        Application.appModule = appModule
        Application.options = { serverLocal: !!options?.serverLocal }

        Application.initComponents()
    }

    private static initComponents() {
        const modules = Application.initModule(Application.appModule, true)

        Application.controllers = modules.controllers
        Application.providers = modules.providers

        Application.initFilters()
        Application.initControllers()
    }

    private static initModule(module: Construtor, include = false) {
        const configModule = Metadata.Get.Class<ModuleConfig>(METADATA_MODULE_CONFIG_KEY, module)

        const modules: Construtor[] = []
        const controllers: Construtor[] = configModule.controllers
        const providers: any[] = configModule.provider

        if (include) {
            modules.push(module)
        }

        configModule.imports.map(module => {
            const configs = Application.initModule(module)

            configs.modules.forEach(imp => modules.push(imp))
            configs.controllers.forEach(imp => controllers.push(imp))
            configs.providers.forEach(imp => providers.push(imp))
        })

        return {
            modules: [...modules, ...configModule.imports],
            controllers,
            providers
        }
    }

    private static initFilters() {
        Application.filters = Application.providers.filter(provider => isInstance(provider) && isFilter(provider)).map(filter => ({ instance: Injection.resolve(filter), class: filter, metadata: Metadata.Get.Class<FilterConfig>(METADATA_FILTER_CONFIG_KEY, filter) }))
    }

    private static initControllers() {
        Application.controllers.map(controller => Application.initController(controller))
    }

    private static initController(controller: Construtor) {
        const instance = Injection.resolve(controller)

        Application.loadEventsHttp(controller, instance)
        Application.loadEventsListener(controller, instance)
    }

    private static loadEventsHttp(controller: Construtor, instance: any) {
        const events = Application.getMethodsInClassByMetadataKey<{ event: string; method: string }>(controller, METADATA_HTTP_ROUTER_HANDLER_KEY)

        events.map(event => {
            const handlers: ((...args: any[]) => any)[] = []

            if (isGuard(controller, event.method)) {
                const methodMetadata = Metadata.Get.Method<GuardConfig>(METADATA_GUARD_CONFIG_KEY, controller, event.method)

                const filter = Application.filters.find(filter => filter.metadata.name = methodMetadata.name)

                if (filter && filter.instance.perform) {
                    handlers.push(async (req, res) => {
                        const response = await filter.instance.perform(req, res)

                        return response
                    })
                }
            }

            handlers.push(async (req, res) => {
                const response = await instance[event.method](req, res)

                return response
            })

            Application.getServer()[event.metadata.method](event.metadata.event, ...handlers)
        })
    }

    private static loadEventsListener(controller: Construtor, instance: any) {
        const events = Application.getMethodsInClassByMetadataKey<{ event: string; method: string }>(controller, METADATA_EVENT_HANDLER_KEY).map(event => ({ ...event, event: Metadata.Get.Method<{ event: string }>(METADATA_EVENT_CONFIG_KEY, controller, event.method).event }))

        events.forEach(event => {
            Application.listener.on(event.event, body => {
                instance[event.method](body)
            })
        })
    }

    private static getMethodsInClassByMetadataKey<Metadata = any>(classConstructor: Construtor, key: string) {
        return getMethodNamesByClass(classConstructor).map(methodName => ({ method: methodName, metadata: Metadata.Get.Method<Metadata>(key, classConstructor, methodName) })).filter(({ metadata }) => !!metadata)
    }

    private static getServer() {
        return !Application.options.serverLocal ? Application.server : Application.serverLocal
    }
}
