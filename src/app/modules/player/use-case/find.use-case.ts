import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { PlayerRepository } from '@modules/player/player.repository'
import { BlindType, Player, PlayerStatus } from '@modules/player/player.model'

@Service({ name: 'player.use-case.find', context: ServiceContext.USE_CASE })
export class PlayerFindUseCase {
    constructor(@Injection.Inject('player.repository') private repository: PlayerRepository) { }

    findById(data: { id: ID }) {
        const player = this.repository.findFirst({ where: { id: { equals: data.id } } })

        if (!player) {
            return Result.failure<Player>({ title: 'Find Player', message: 'Player not found' })
        }

        return Result.success<Player>(player)
    }

    findByLogin(data: { login: string }) {
        const player = this.repository.findFirst({ where: { login: { equals: data.login } } })

        if (!player) {
            return Result.failure<Player>({ title: 'Find Player', message: 'Player not found' })
        }

        return Result.success<Player>(player)
    }

    findByRoomIdAndIsCurrentBidding(data: { roomId: ID }) {
        const player = this.repository.findFirst({
            where: {
                roomId: { equals: data.roomId },
                isCurrentBidding: { equals: true }
            }
        })

        if (!player) {
            return Result.failure<Player>({ title: 'Find Player', message: 'Player not found' })
        }

        return Result.success<Player>(player)
    }

    findByRoomIdAndIsDealer(data: { roomId: ID }) {
        const player = this.repository.findFirst({
            where: {
                roomId: { equals: data.roomId },
                isDealer: { equals: true }
            }
        })

        if (!player) {
            return Result.failure<Player>({ title: 'Find Player', message: 'Player not found' })
        }

        return Result.success<Player>(player)
    }

    findManyByRoomId(data: { roomId: ID }) {
        return Result.success<Player[]>(this.repository.findMany({ where: { roomId: { equals: data.roomId } }, orderBy: { order: 'ASC' } }))
    }

    findManyByRoomIdWithBlindType(data: { roomId: ID; blindTypes: BlindType[] }) {
        return Result.success<Player[]>(
            this.repository.findMany({
                where: {
                    roomId: { equals: data.roomId },
                    OR: data.blindTypes.map(blindType => ({ blindType: { equals: blindType } }))
                },
                orderBy: { order: 'ASC' }
            })
        )
    }

    findManyByRoomIdWithStatus(data: { roomId: ID; status: PlayerStatus[] }) {
        return Result.success<Player[]>(
            this.repository.findMany({
                where: {
                    roomId: { equals: data.roomId },
                    OR: data.status.map(status => ({ status: { equals: status } }))
                },
                orderBy: { order: 'ASC' }
            })
        )
    }

    findMany() {
        return Result.success<Player[]>(this.repository.findMany())
    }
}
