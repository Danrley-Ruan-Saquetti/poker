import { DeckQueryUseCase } from '@modules/deck/use-case/query.use-case'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { GameState } from '@modules/game/game.model'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'
import { GameRepository } from '@modules/game/game.repository'
import { GameQueryUseCase } from '@modules/game/use-case/query.use-case'

@Service({ name: 'game.use-case.state', context: ServiceContext.USE_CASE })
export class GameStateUseCase {
    constructor(
        @Injection.Inject('game.repository') private repository: GameRepository,
        @Injection.Inject('game.use-case.query') private querUC: GameQueryUseCase,
        @Injection.Inject('player.use-case.query') private playerQueryUC: PlayerQueryUseCase,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('deck.use-case.query') private deckQueryUC: DeckQueryUseCase,
    ) { }

    getStateById(data: { id: ID }) {
        if (!this.repository.isExists({ where: { id: { equals: data.id } } })) {
            return Result.failure({ title: 'Get State of Game', message: 'Game not found' })
        }

        return this.performGetStateById(data)
    }

    getStateByRoomId(data: { roomId: ID }) {
        const roomResult = this.roomQueryUC.queryById({ id: data.roomId })

        if (!roomResult.isSuccess()) {
            return Result.failure<GameState>(roomResult.getError())
        }

        return this.performGetStateById({ id: roomResult.getValue().gameId })
    }

    private performGetStateById(data: { id: ID }) {
        const gameResult = this.querUC.queryById(data)

        const playersResult = this.playerQueryUC.queryManySimpleByGameId({ gameId: data.id })

        if (!playersResult.isSuccess()) {
            return Result.failure<GameState>(playersResult.getError())
        }

        const roomResult = this.roomQueryUC.queryByGameId({ gameId: data.id })

        if (!roomResult.isSuccess()) {
            return Result.failure<GameState>(roomResult.getError())
        }

        const deckResult = this.deckQueryUC.queryByGameId({ gameId: data.id })

        if (!deckResult.isSuccess()) {
            return Result.failure<GameState>(deckResult.getError())
        }

        return Result.success<GameState>({
            game: gameResult.getValue(),
            players: playersResult.getValue(),
            deck: deckResult.getValue(),
            room: roomResult.getValue()
        })
    }
}
