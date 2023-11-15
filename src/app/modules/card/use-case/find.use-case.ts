import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { CardRepository } from '@modules/card/card.repository'
import { Card, CardSuit } from '@modules/card/card.model'

@Service({ name: 'card.use-case.find', context: ServiceContext.USE_CASE })
export class CardFindUseCase {
    constructor(@Injection.Inject('card.repository') private repository: CardRepository) {}

    findById(data: { id: ID }) {
        const card = this.repository.findFirst({ where: { id: { equals: data.id } } })

        if (!card) {
            return Result.failure<Card>({ title: 'Find Card', message: 'Card not found' })
        }

        return Result.success<Card>(card)
    }

    findByNumberAndSuitAndDeckId(data: { number: number; suit: CardSuit; deckId: ID }) {
        const card = this.repository.findFirst({
            where: {
                deckId: { equals: data.deckId },
                suit: { equals: data.suit },
                number: { equals: data.number }
            }
        })

        if (!card) {
            return Result.failure<Card>({ title: 'Find Card', message: 'Card not found' })
        }

        return Result.success<Card>(card)
    }

    findByNumberAndSuitAndDeckIdAndInDeck(data: { number: number; suit: CardSuit; deckId: ID }) {
        const card = this.repository.findFirst({
            where: {
                deckId: { equals: data.deckId },
                suit: { equals: data.suit },
                number: { equals: data.number },
                inDeck: { equals: true }
            }
        })

        if (!card) {
            return Result.failure<Card>({ title: 'Find Card', message: 'Card not found' })
        }

        return Result.success<Card>(card)
    }

    findMany() {
        return Result.success<Card[]>(this.repository.findMany())
    }

    findManyByDeckId(data: { deckId: ID }) {
        return Result.success<Card[]>(this.repository.findMany({ where: { deckId: { equals: data.deckId } } }))
    }
}
