import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'
import { removeAttributesOfObject } from '@util'
import { PlayerRepository } from '@modules/player/player.repository'
import { Player } from '@modules/player/player.model'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'

@Service({ name: 'player.use-case.query', context: 'Use Case' })
export class PlayerQueryUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
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

    findManyByGameId(data: { gameId: ID }) {
        const responseRoom = this.roomQueryUC.getRoomByGameId(data)

        if (!responseRoom.isSuccess()) {
            // @ts-expect-error
            return responseRoom as Result<Omit<Player, 'password'>[]>
        }

        const players = this.playerRepository.findMany({ where: { roomId: { equals: responseRoom.getValue().id } }, orderBy: { order: 'ASC' } })

        return Result.success<Omit<Player, 'password'>[]>(players.map(player => removeAttributesOfObject(player, 'password')))
    }
}
