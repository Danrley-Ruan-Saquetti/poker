import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { CardRepository } from '@modules/card/card.repository'
import { Card } from '@modules/card/card.model'
import { DeckQueryUseCase } from '@modules/deck/use-case/query.use-case'

@Service({ name: 'card.use-case.query', context: 'Use Case' })
export class CardQueryUseCase {
    constructor(
        @Injection.Inject('card.repository') private repository: CardRepository,
        @Injection.Inject('deck.use-case.query') private deckQueryUC: DeckQueryUseCase
    ) {}

    findByDeckId(data: { deckId: ID }) {
        if (!this.deckQueryUC.getById({ id: data.deckId })) {
            return Result.failure<Card[]>({ title: 'Query Card', message: 'Deck not found' })
        }

        const cards = this.repository.findMany({ where: { deckId: { equals: data.deckId } } })

        return Result.success<Card[]>(cards)
    }
}
