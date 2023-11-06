import { METADATA_CONTROLLER_KEY } from '@constants/index'
import { DecoratorMetadata, Metadata } from '@esliph/metadata'

export type ControllerConfig = {}

export function Controller(config?: Partial<ControllerConfig>) {
    function handle(constructor: any) {}

    return DecoratorMetadata.Create.Class({ key: METADATA_CONTROLLER_KEY, value: true }, handle)
}

export function isController(constructor: any) {
    return !!Metadata.Get.Class(METADATA_CONTROLLER_KEY, constructor)
}
