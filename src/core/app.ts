import { Construtor } from '@@types/index'
import { ModuleConfig } from '@common/decorator'
import { isModule } from '@common/module'
import { METADATA_MODULE_CONFIG_KEY } from '@constants/index'
import { ResultException } from '@esliph/common'
import { Metadata } from '@esliph/metadata'

export class Application {
    private static appModule: Construtor

    static fabric(appModule: Construtor) {
        if (!isModule(appModule)) {
            throw new ResultException({ title: `Class "${appModule.name}" is not a module`, message: `Apply decorator "Module" in class "${appModule.name}"` })
        }

        Application.appModule = appModule

        Application.initComponents()
    }

    private static initComponents() {
        const modules = Application.initModule(Application.appModule, true)

        console.log(modules)
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
}
