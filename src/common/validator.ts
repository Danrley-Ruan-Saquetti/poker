import { Metadata } from '@esliph/metadata'
import { METADATA_VALIDATOR_KEY } from '@constants/index'

export function isValidator(constructor: any) {
    return !!Metadata.Get.Class(METADATA_VALIDATOR_KEY, constructor)
}
