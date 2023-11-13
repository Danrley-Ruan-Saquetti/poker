import { DecoratorMetadata, Metadata } from '@esliph/metadata'
import { METADATA_VALIDATE_CONFIG_KEY, METADATA_VALIDATE_KEY } from '@constants'

export type ValidateConfig = {
    name: string
}

export function Validate(config: ValidateConfig) {
    function handle(constructor: any) {
        Metadata.Create.Class({ key: METADATA_VALIDATE_CONFIG_KEY, value: config }, constructor)
    }

    return DecoratorMetadata.Create.Class({ key: METADATA_VALIDATE_KEY, value: true }, handle)
}
