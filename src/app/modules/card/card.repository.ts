import { ModelSchema } from '@esliph/repository-memory'
import { Service, ServiceContext } from '@common/module/decorator'
import { CardModel } from '@modules/card/card.model'

@Service({ name: 'card.repository', context: ServiceContext.REPOSITORY })
export class CardRepository extends ModelSchema<CardModel> {
    constructor() {
        super('Card')
    }
}
