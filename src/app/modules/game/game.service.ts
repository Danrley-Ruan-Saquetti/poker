import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'
import { PlayerService } from '@modules/player/player.service'
import { RoomService } from '@modules/room/room.service'

@Service({ name: 'game.service' })
export class GameService {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.service') private playerService: PlayerService,
        @Injection.Inject('room.service') private roomService: RoomService,
    ) { }

    create(data: { playerId: number }) {
        const game = this.gameRepository.create({ data: { isRunning: false } })
        const room = this.roomService.create({ gameId: game.id })

        this.playerService.update({ where: { id: { equals: data.playerId } }, data: { roomId: room.getValue().id } })

        return Result.success({ id: game.id })
    }
}
