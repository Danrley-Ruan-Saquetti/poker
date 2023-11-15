import { ModelSchema } from '@esliph/repository-memory'
import { Service, ServiceContext } from '@common/module/decorator'
import { DeckModel } from '@modules/deck/deck.model'

@Service({ name: 'deck.repository', context: ServiceContext.REPOSITORY })
export class DeckRepository extends ModelSchema<DeckModel> {
    constructor() {
        super('Deck')
    }
}
