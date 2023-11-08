import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { RoomRepository } from '@modules/room/room.repository'
import { Room } from '@modules/room/room.model'
import { ID } from '@@types'

@Service({ name: 'room.service' })
export class RoomService {
    constructor(
        @Injection.Inject('room.repository') private roomRepository: RoomRepository,
    ) { }

    create(data: { gameId: number }) {
        const { id } = this.roomRepository.create({
            data: {
                betTimeout: 15 * 1000,
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

    getRoomByGameId(data: { gameId: ID }) {
        const room = this.roomRepository.findFirst({ where: { gameId: { equals: data.gameId } } })

        if (!room) {
            return Result.failure<Room>({ title: 'Find Room', message: 'Cannot found room' })
        }

        return Result.success<Room>(room)
    }

    getRoomId(data: { roomId: ID }) {
        const room = this.roomRepository.findFirst({ where: { id: { equals: data.roomId } } })

        if (!room) {
            return Result.failure<Room>({ title: 'Find Room', message: 'Cannot found room' })
        }

        return Result.success<Room>(room)
    }
}
