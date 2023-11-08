import { ModelSchema } from '@esliph/repository-memory'
import { Service } from '@common/module/decorator'
import { DeckModel } from '@modules/deck/deck.model'

@Service({ name: 'deck.repository' })
export class DeckRepository extends ModelSchema<DeckModel> {
    constructor() {
        super('Deck')
    }
}
