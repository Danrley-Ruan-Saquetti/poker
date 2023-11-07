import express from 'express'
import { Construtor } from '@@types/index'
import { ModuleConfig } from '@common/module/decorator'
import { isModule } from '@common/module'
import { METADATA_EVENT_HANDLER_KEY, METADATA_HTTP_ROUTER_HANDLER_KEY, METADATA_MODULE_CONFIG_KEY } from '@constants/index'
import { ResultException } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Metadata } from '@esliph/metadata'
import { ObserverListener } from '@esliph/observer'
import { getMethodNamesByClass } from '@util/index'
import { Server } from '@esliph/http'

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
        Application.options = {serverLocal: !!options?.serverLocal}

        Application.initComponents()
    }

    private static initComponents() {
        const modules = Application.initModule(Application.appModule, true)

        Application.initControllers(modules.controllers)
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

            configs.modules.forEach(impo => modules.push(impo))
            configs.controllers.forEach(impo => controllers.push(impo))
            configs.providers.forEach(impo => providers.push(impo))
        })

        return {
            modules: [...modules, ...configModule.imports],
            controllers,
            providers
        }
    }

    private static initControllers(controllers: Construtor[]) {
            const server = !Application.options.serverLocal ? Application.server : Application.serverLocal
            
            controllers.map(controller => {
            const events = getMethodNamesByClass(controller)
                .map(methodName => {
                    const metadataValueHttp = Metadata.Get.Method<{ event: string; method: string }>(METADATA_HTTP_ROUTER_HANDLER_KEY, controller, methodName)

                    return { method: methodName, event: metadataValueHttp, type: 'HTTP' }
                })
                .filter(({ event }) => !!event)

            const instance = Injection.resolve(controller)

            events.map(event => {
                if (typeof instance[event.method] == 'undefined') {
                    return
                }

                if (event.type == 'EVENT') {
                    // @ts-expect-error
                    Application.listener.on(event.event, (data) => {
                        instance[event.method](data)
                    })
                } else if (event.type == 'HTTP') {
                    server[event.event.method](event.event.event, async (req, res) => {
                        const response = await instance[event.method](req, res)

                        return response
                    })
                }
            })
        })
    }
}
