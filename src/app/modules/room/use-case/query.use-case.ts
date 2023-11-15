import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { Room } from '@modules/room/room.model'
import { RoomFindUseCase } from '@modules/room/use-case/find.use-case'
import { GameFindUseCase } from '@modules/game/use-case/find.use-case'

@Service({ name: 'room.use-case.query', context: ServiceContext.USE_CASE })
export class RoomQueryUseCase {
    constructor(
        @Injection.Inject('room.use-case.find') private findUC: RoomFindUseCase,
        @Injection.Inject('game.use-case.find') private gameFindUC: GameFindUseCase
    ) { }

    queryById(data: { id: ID }) {
        return this.findUC.findById({ id: data.id })
    }

    queryByGameId(data: { gameId: ID }) {
        const gameResult = this.gameFindUC.findById({ id: data.gameId })

        if (!gameResult.isSuccess()) {
            return Result.failure<Room>(gameResult.getError())
        }

        return this.findUC.findByGameId({ gameId: data.gameId })
    }
}
