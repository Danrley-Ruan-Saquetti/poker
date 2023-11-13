import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types'
import { Service } from '@common/module/decorator'
import { CardSuit } from '@modules/card/card.model'
import { CardRepository } from '@modules/card/card.repository'

@Service({ name: 'card.use-case.create', context: 'Use Case' })
export class CardCreateUseCase {
    constructor(@Injection.Inject('card.repository') private repository: CardRepository) {}

    perform() {
        return Result.success(this.getFullDeckCards())
    }

    performCreateByDeckId(data: { deckId: ID }) {
        const cards = this.getFullDeckCards()

        if (this.repository.isExists({ where: { deckId: { equals: data.deckId } } })) {
            return Result.failure({ title: 'Create Card', message: 'Cards already exists' })
        }

        this.repository.createMany({ data: cards.map(card => ({ ...card, inDeck: true, deckId: data.deckId })) })

        return Result.success(this.getFullDeckCards())
    }

    getFullDeckCards() {
        const cards: { suit: CardSuit; number: number }[] = []

        Object.keys(CardSuit).map(suit => {
            for (let i = 1; i <= 13; i++) {
                cards.push({ number: i, suit: CardSuit[suit] })
            }
        })

        return cards
    }
}
