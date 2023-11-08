import { DecoratorMetadata, Metadata } from '@esliph/metadata'
import { METADATA_SERVICE_CONFIG_KEY, METADATA_SERVICE_KEY } from '@constants/index'
import { Injection } from '@esliph/injection'

export type ServiceConfig = {
    name: string
}

export function Service(config: Partial<ServiceConfig> = {}) {
    function handle(constructor: any) {
        if (config.name) {
            Injection.Injectable(config.name)(constructor)
        }

        Metadata.Create.Class({ key: METADATA_SERVICE_CONFIG_KEY, value: config }, constructor)
    }

    return DecoratorMetadata.Create.Class({ key: METADATA_SERVICE_KEY, value: true }, handle)
}