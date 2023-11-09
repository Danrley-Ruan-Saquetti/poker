import { RoomCreateUseCase } from '@modules/room/use-case/create.use-case'
import { Injection } from '@esliph/injection'
import { PlayerService } from '@modules/player/player.service'
import { Service } from '@common/module/decorator'
import { GameType } from '@modules/game/game.model'
import { ID } from '@@types/index'

@Service({ name: 'game-mode.service' })
export class GameModeService {
    constructor(
        @Injection.Inject('room.use-case.create') private roomCreateUC: RoomCreateUseCase,
        @Injection.Inject('player.service') private playerService: PlayerService,
    ) { }

    createGame(data: { playerId: ID, type: GameType, gameId: ID }) {
        const room = this.roomCreateUC.perform({ gameId: data.gameId })

        this.joinPlayer({ playerId: data.playerId, roomId: room.getValue().id })
    }

    joinPlayer(data: { playerId: ID, roomId: ID }) {
        this.playerService.joinGame({ playerId: data.playerId, roomId: data.roomId })
    }
}
