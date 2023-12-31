import { GameFindUseCase } from '@modules/game/use-case/find.use-case'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { DeckFindUseCase } from '@modules/deck/use-case/find.use-case'
import { RoomFindUseCase } from '@modules/room/use-case/find.use-case'
import { Deck } from '@modules/deck/deck.model'

@Service({ name: 'deck.use-case.query', context: ServiceContext.USE_CASE })
export class DeckQueryUseCase {
    constructor(
        @Injection.Inject('deck.use-case.find') private findUC: DeckFindUseCase,
        @Injection.Inject('room.use-case.find') private roomFindUC: RoomFindUseCase,
        @Injection.Inject('game.use-case.find') private gameFindUC: GameFindUseCase
    ) { }

    queryByGameId(data: { gameId: ID }) {
        const gameResult = this.gameFindUC.findById({ id: data.gameId })

        if (!gameResult.isSuccess()) {
            return Result.failure<Deck>(gameResult.getError())
        }

        const roomResult = this.roomFindUC.findByGameId({ gameId: data.gameId })

        if (!roomResult.isSuccess()) {
            return Result.failure<Deck>(roomResult.getError())
        }

        return this.findByRoomId({ roomId: roomResult.getValue().id })
    }

    queryByRoomId(data: { roomId: ID }) {
        const roomResult = this.roomFindUC.findById({ id: data.roomId })

        if (!roomResult.isSuccess()) {
            return Result.failure<Deck>(roomResult.getError())
        }

        return this.findByRoomId({ roomId: data.roomId })
    }

    private findByRoomId(data: { roomId: ID }) {
        return this.findUC.findByRoomId({ roomId: data.roomId })
    }

    queryById(data: { id: ID }) {
        return this.findById({ id: data.id })
    }

    private findById(data: { id: ID }) {
        return this.findUC.findById({ id: data.id })
    }
}
