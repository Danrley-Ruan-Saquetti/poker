import { DecoratorMetadata, Metadata } from '@esliph/metadata'
import { Injection } from '@esliph/injection'
import { METADATA_VALIDATOR_CONFIG_KEY, METADATA_VALIDATOR_KEY } from '@constants'

export type ValidatorConfig = {
    name: string
}

export function Validator(config: ValidatorConfig) {
    function handle(constructor: any) {
        Metadata.Create.Class({ key: METADATA_VALIDATOR_CONFIG_KEY, value: config }, constructor)
        Injection.InjectableService(config.name, constructor)
    }

    return DecoratorMetadata.Create.Class({ key: METADATA_VALIDATOR_KEY, value: true }, handle)
}
