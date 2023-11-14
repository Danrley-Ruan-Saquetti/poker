import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types/index'
import { Service, ServiceContext } from '@common/module/decorator'
import { Card } from '@modules/card/card.model'
import { CardFindUseCase } from '@modules/card/use-case/find.use-case'
import { DeckFindUseCase } from '@modules/deck/use-case/find.use-case'
import { RoomFindUseCase } from '@modules/room/use-case/find.use-case'
import { GameFindUseCase } from '@modules/game/use-case/find.use-case'

@Service({ name: 'card.use-case.query', context: ServiceContext.USE_CASE })
export class CardQueryUseCase {
    constructor(
        @Injection.Inject('card.use-case.find') private findUC: CardFindUseCase,
        @Injection.Inject('deck.use-case.find') private deckFindUC: DeckFindUseCase,
        @Injection.Inject('game.use-case.find') private gameFindUC: GameFindUseCase,
        @Injection.Inject('room.use-case.find') private RoomFindUC: RoomFindUseCase
    ) {}

    queryManyByGameId(data: { gameId: ID }) {
        const gameResult = this.gameFindUC.findById({ id: data.gameId })

        if (!gameResult.isSuccess()) {
            return Result.failure<Card[]>(gameResult.getError())
        }

        return this.findManyByGameId({ gameId: gameResult.getValue().id })
    }

    private findManyByGameId(data: { gameId: ID }) {
        const roomResult = this.RoomFindUC.findByGameId({ gameId: data.gameId })

        if (!roomResult.isSuccess()) {
            return Result.failure<Card[]>(roomResult.getError())
        }

        return this.findManyByRoomId({ roomId: roomResult.getValue().id })
    }

    queryManyByRoomId(data: { roomId: ID }) {
        const roomResult = this.RoomFindUC.findById({ id: data.roomId })

        if (!roomResult.isSuccess()) {
            return Result.failure<Card[]>(roomResult.getError())
        }

        return this.findManyByRoomId({ roomId: roomResult.getValue().id })
    }

    private findManyByRoomId(data: { roomId: ID }) {
        const deckResult = this.deckFindUC.findByRoomId({ roomId: data.roomId })

        if (!deckResult.isSuccess()) {
            return Result.failure<Card[]>(deckResult.getError())
        }

        return this.findManyByDeckId({ deckId: deckResult.getValue().id })
    }

    queryManyByDeckId(data: { deckId: ID }) {
        const deckResult = this.deckFindUC.findById({ id: data.deckId })

        if (!deckResult.isSuccess()) {
            return Result.failure<Card[]>(deckResult.getError())
        }

        return this.findUC.findManyByDeckId({ deckId: deckResult.getValue().id })
    }

    private findManyByDeckId(data: { deckId: ID }) {
        return this.findUC.findManyByDeckId({ deckId: data.deckId })
    }
}
