import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { Card } from '@modules/card/card.model'
import { CardRepository } from '@modules/card/card.repository'
import { DeckQueryUseCase } from '@modules/deck/use-case/query.use-case'
import { GameRepository } from '@modules/game/game.repository'

@Service({ name: 'card.use-case.query', context: 'Use Case' })
export class CardQueryUseCase {
    constructor(
        @Injection.Inject('card.repository') private repository: CardRepository,
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('deck.use-case.query') private deckQueryUC: DeckQueryUseCase
    ) {}

    findManyByGameId(data: { id: ID }) {}

    findManyByDeckId(data: { id: ID }) {
        if (!this.deckQueryUC.getById({ id: data.id })) {
            return Result.failure<Card[]>({ title: 'Query Card', message: 'Deck not found' })
        }

        const cards = this.repository.findMany({ where: { deckId: { equals: data.id } } })

        return Result.success<Card[]>(cards)
    }
}
