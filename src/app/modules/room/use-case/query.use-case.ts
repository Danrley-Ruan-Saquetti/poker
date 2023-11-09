import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'
import { Room } from '@modules/room/room.model'
import { RoomRepository } from '@modules/room/room.repository'

@Service({ name: 'room.use-case.query', context: 'Use Case' })
export class RoomQueryUseCase {
    constructor(
        @Injection.Inject('room.repository') private roomRepository: RoomRepository,
    ) { }

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
