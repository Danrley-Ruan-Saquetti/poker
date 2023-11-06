import { Construtor } from '@@types/index'
import { DecoratorMetadata, Metadata } from '@esliph/metadata'
import { METADATA_MODULE_KEY } from '@constants/index'
import { isController } from '@common/controller'
import { ResultException } from '@esliph/common'

export type ModuleConfig = {
    imports: Construtor[]
    controllers: Construtor[]
}

export function Module(config?: Partial<ModuleConfig>) {
    function handle(constructor: any) {
        if (config?.controllers) {
            config.controllers.forEach(controller => {
                if (!isController(controller)) {
                    throw new ResultException({ title: `Class "${controller.name}" is not a controller`, message: '' })
                }
            })
        }
    }

    return DecoratorMetadata.Create.Class({ key: METADATA_MODULE_KEY, value: true }, handle)
}

export function isModule(constructor: any) {
    return !!Metadata.Get.Class(METADATA_MODULE_KEY, constructor)
}
