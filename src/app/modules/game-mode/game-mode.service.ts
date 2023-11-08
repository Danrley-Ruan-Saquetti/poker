import { Injection } from '@esliph/injection'
import { GameService } from '@modules/game/game.service'
import { RoomService } from '@modules/room/room.service'
import { PlayerService } from '@modules/player/player.service'
import { Service } from '@common/module/decorator'
import { GameType } from '@modules/game/game.model'
import { ID } from '@@types/index'

@Service({ name: 'game-mode.service' })
export class GameModeService {
    constructor(
        @Injection.Inject('game.service') private gameService: GameService,
        @Injection.Inject('room.service') private roomService: RoomService,
        @Injection.Inject('player.service') private playerService: PlayerService,
    ) { }

    createGame(data: { playerId: ID, type: GameType, gameId: ID }) {
        const room = this.roomService.create({ gameId: data.gameId })

        this.joinPlayer({ playerId: data.playerId, roomId: room.getValue().id })
    }

    joinPlayer(data: { playerId: ID, roomId: ID }) {
        this.playerService.joinGame({ playerId: data.playerId, roomId: data.roomId })
    }
}
