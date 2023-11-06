import { METADATA_CONTROLLER_KEY } from '@constants/index'
import { DecoratorMetadata } from '@esliph/metadata'

export type ControllerConfig = {}

export function Controller(config?: Partial<ControllerConfig>) {
    function handle(constructor: any) {}

    return DecoratorMetadata.Create.Class({ key: METADATA_CONTROLLER_KEY, value: true }, handle)
}
