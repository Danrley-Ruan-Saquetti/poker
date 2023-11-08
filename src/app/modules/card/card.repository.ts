import { ModelSchema } from '@esliph/repository-memory'
import { Service } from '@common/module/decorator'
import { CardModel } from '@modules/card/card.model'

@Service({ name: 'card.repository' })
export class CardRepository extends ModelSchema<CardModel> {
    constructor() {
        super('Card')
    }
}
