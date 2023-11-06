import { Construtor } from '@@types/index'
import { isModule } from '@common/module'
import { ResultException } from '@esliph/common'

export class Application {
    private static appModule: Construtor

    static fabric(appModule: Construtor) {
        if (!isModule(appModule)) {
            throw new ResultException({ title: `Class "${appModule.name}" is not a module`, message: `Apply decorator "Module" in class "${appModule.name}"` })
        }

        Application.appModule = appModule
    }
}
