import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { ID } from '@@types/index'
import { GameType } from '@modules/game/game.model'
import { RoomCreateUseCase } from '@modules/room/use-case/create.use-case'
import { PlayerJoinGameUseCase } from '@modules/player/use-case/join-game.use-case'

@Service({ name: 'game-mode.service' })
export class GameModeService {
    constructor(
        @Injection.Inject('room.use-case.create') private roomCreateUC: RoomCreateUseCase,
        @Injection.Inject('player.use-case.join-game') private playerJoinGameUC: PlayerJoinGameUseCase,
    ) { }

    createGame(data: { playerId: ID, type: GameType, gameId: ID }) {
        const room = this.roomCreateUC.perform({ gameId: data.gameId })

        this.joinPlayer({ playerId: data.playerId, roomId: room.getValue().id })
    }

    joinPlayer(data: { playerId: ID, roomId: ID }) {
        this.playerJoinGameUC.perform({ playerId: data.playerId, roomId: data.roomId })
    }
}
