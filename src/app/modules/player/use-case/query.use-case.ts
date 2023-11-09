import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'
import { removeAttributesOfObject } from '@util'
import { PlayerRepository } from '@modules/player/player.repository'
import { Player } from '@modules/player/player.model'

@Service({ name: 'player.use-case.query', context: 'Use Case' })
export class PlayerQueryUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
    ) { }

    findById(data: { playerId: number }) {
        const player = this.playerRepository.findFirst({ where: { id: { equals: data.playerId } } })

        if (!player) {
            return Result.failure<Omit<Player, 'password'>>({ title: 'Find Player', message: 'Cannot found player' })
        }

        return Result.success<Omit<Player, 'password'>>(removeAttributesOfObject({ ...player }, 'password'))
    }

    findAll() {
        return Result.success<Player[]>(this.playerRepository.findMany())
    }

    findManyByRoomId(data: { roomId: ID }) {
        const players = this.playerRepository.findMany({ where: { roomId: { equals: data.roomId } }, orderBy: { order: 'ASC' } })

        return Result.success<Omit<Player, 'password'>[]>(players.map(player => removeAttributesOfObject(player, 'password')))
    }
}
