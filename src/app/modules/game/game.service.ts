import { ID } from '@@types/index'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { PlayerService } from '@modules/player/player.service'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'

@Service({ name: 'game.service' })
export class GameService {
    constructor(
        @Injection.Inject('player.service') private playerService: PlayerService,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
    ) { }

    getPlayersByGameId(data: { gameId: ID }) {
        const resultRoom = this.roomQueryUC.getRoomByGameId({ gameId: data.gameId })

        if (!resultRoom.isSuccess()) {
            return Result.failure({ title: 'Find Players in Game', message: 'Cannot found room' })
        }

        return Result.success(this.playerService.findManyByRoomId({ roomId: resultRoom.getValue().id }))
    }
}
