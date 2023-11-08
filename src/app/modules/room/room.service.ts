import { Service } from '@common/module/decorator'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { RoomRepository } from '@modules/room/room.repository'

@Service({ name: 'room.service' })
export class RoomService {
    constructor(
        @Injection.Inject('room.repository') private roomRepository: RoomRepository,
    ) { }

    create(data: { gameId: number }) {
        const { id } = this.roomRepository.create({ data: { betTimeout: 15 * 1000, betValueCurrentRound: 0, gameId: data.gameId, minimumBetAmount: 0, orderCurrentBidding: 0, orderCurrentBigBlind: 0, orderCurrentDealer: 0, orderCurrentSmallBlind: 0, potAmount: 0 } })

        return Result.success({ id })
    }
}
