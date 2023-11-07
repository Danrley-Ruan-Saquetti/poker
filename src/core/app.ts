import express from 'express'
import { ResultException } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Metadata } from '@esliph/metadata'
import { ObserverListener } from '@esliph/observer'
import { Server } from '@esliph/http'
import { Construtor } from '@@types/index'
import { ModuleConfig } from '@common/module/decorator'
import { isModule } from '@common/module'
import { METADATA_FILTER_CONFIG_KEY, METADATA_GUARD_CONFIG_KEY, METADATA_HTTP_ROUTER_HANDLER_KEY, METADATA_MODULE_CONFIG_KEY } from '@constants/index'
import { getMethodNamesByClass, isInstance } from '@util/index'
import { isFilter } from '@common/filter'
import { isGuard } from '@common/guard'
import { GuardConfig } from '@common/module/decorator/guard'
import { FilterConfig } from '@common/module/decorator/filter'
import console from 'console'

export class Application {
    static server = express()
    static serverLocal = new Server()
    private static listener = new ObserverListener()
    private static appModule: Construtor
    private static options: { serverLocal?: boolean }

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

        Application.initControllers(modules.controllers, modules.providers)
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

    private static initControllers(controllers: Construtor[], providers: any[]) {
        const server = !Application.options.serverLocal ? Application.server : Application.serverLocal

        const filters = providers.filter(provider => isInstance(provider) && isFilter(provider)).map(filter => ({ instance: Injection.resolve(filter), class: filter, metadata: Metadata.Get.Class<FilterConfig>(METADATA_FILTER_CONFIG_KEY, filter) }))

        controllers.map(controller => {
            const events = Application.getMethodsInClassByMetadataKey<{ event: string; method: string }>(controller, METADATA_HTTP_ROUTER_HANDLER_KEY)

            const instance = Injection.resolve(controller)

            events.map(event => {
                const middlewares: ((...args: any[]) => any)[] = []

                if (isGuard(controller, event.method)) {
                    const methodMetadata = Metadata.Get.Method<GuardConfig>(METADATA_GUARD_CONFIG_KEY, controller, event.method)

                    const filter = filters.find(filter => filter.metadata.name = methodMetadata.name)

                    if (filter && filter.instance.perform) {
                        middlewares.push(filter.instance.perform)
                    }
                }

                server[event.metadata.method](event.metadata.event, ...middlewares, async (req, res) => {
                    const response = await instance[event.method](req, res)

                    return response
                })
            })
        })
    }

    private static getMethodsInClassByMetadataKey<Metadata = any>(classConstructor: Construtor, key: string) {
        return getMethodNamesByClass(classConstructor).map(methodName => ({ method: methodName, metadata: Metadata.Get.Method<Metadata>(key, classConstructor, methodName) })).filter(({ metadata }) => !!metadata)
    }
}
