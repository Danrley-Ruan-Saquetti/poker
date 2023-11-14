import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { RoomRepository } from '@modules/room/room.repository'
import { Room } from '@modules/room/room.model'

@Service({ name: 'room.use-case.find', context: ServiceContext.USE_CASE })
export class RoomFindUseCase {
    constructor(@Injection.Inject('room.repository') private repository: RoomRepository) {}

    findById(data: { id: ID }) {
        const room = this.repository.findFirst({ where: { id: { equals: data.id } } })

        if (!room) {
            return Result.failure<Room>({ title: 'Find Room', message: 'Room not found' })
        }

        return Result.success<Room>(room)
    }

    findByGameId(data: { gameId: ID }) {
        const room = this.repository.findFirst({ where: { gameId: { equals: data.gameId } } })

        if (!room) {
            return Result.failure<Room>({ title: 'Find Room', message: 'Room not found' })
        }

        return Result.success<Room>(room)
    }

    findMany() {
        return Result.success<Room[]>(this.repository.findMany())
    }
}
