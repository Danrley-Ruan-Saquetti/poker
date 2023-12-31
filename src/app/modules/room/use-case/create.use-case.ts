import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service, ServiceContext } from '@common/module/decorator'
import { RoomRepository } from '@modules/room/room.repository'

@Service({ name: 'room.use-case.create', context: ServiceContext.USE_CASE })
export class RoomCreateUseCase {
    constructor(@Injection.Inject('room.repository') private repository: RoomRepository) {}

    perform(data: { gameId: number }) {
        if (this.repository.isExists({ where: { gameId: { equals: data.gameId } } })) {
            return Result.failure({ title: 'Create Room', message: 'Room in game already exists' })
        }

        const { id } = this.repository.create({
            data: {
                betTimeout: 15 * 1000,
                playersLimit: 9,
                betValueCurrentRound: 0,
                gameId: data.gameId,
                minimumBetAmount: 0,
                orderCurrentBidding: 0,
                orderCurrentBigBlind: 0,
                orderCurrentDealer: 0,
                orderCurrentSmallBlind: 0,
                potAmount: 0
            }
        })

        return Result.success({ id })
    }
}
