import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'
import { removeAttributesOfObject } from '@util'
import { PlayerRepository } from '@modules/player/player.repository'
import { Player, PlayerInfo, PlayerWithoutPassword } from '@modules/player/player.model'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'

@Service({ name: 'player.use-case.query', context: 'Use Case' })
export class PlayerQueryUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
    ) { }

    queryById(data: { playerId: number }) {
        const playerResult = this.findById(data)

        if (!playerResult.isSuccess()) {
            return playerResult
        }

        return Result.success<PlayerInfo>(this.removeGeneralAttributesPlayer(playerResult.getValue()))
    }

    queryLogin(data: { login: string }) {
        const playerResult = this.findByLogin({ login: data.login })

        if (!playerResult.isSuccess()) {
            return playerResult
        }

        return Result.success<PlayerInfo>(this.removeGeneralAttributesPlayer(playerResult.getValue()))
    }

    queryAll() {
        return Result.success<PlayerWithoutPassword[]>(this.playerRepository.findMany().map(player => this.removePasswordAttributesPlayer(player)))
    }

    findById(data: { playerId: number }) {
        const player = this.playerRepository.findFirst({ where: { id: { equals: data.playerId } } })

        if (!player) {
            return Result.failure<Player>({ title: 'Find Player', message: 'Cannot found player' })
        }

        return Result.success<Player>(player)
    }

    findByLogin(data: { login: string }) {
        const player = this.playerRepository.findFirst({ where: { login: { equals: data.login } } })

        if (!player) {
            return Result.failure<Player>({ title: 'Find Player', message: `Cannot found player with login "${data.login}"` })
        }

        return Result.success<Player>(player)
    }

    findAll() {
        const playersResult = this.queryAll()

        if (playersResult.isSuccess()) {
            return playersResult
        }

        return Result.success<PlayerInfo[]>(playersResult.getValue().map(player => this.removeGeneralAttributesPlayer(player)))
    }

    findManyByRoomId(data: { roomId: ID }) {
        const players = this.playerRepository.findMany({ where: { roomId: { equals: data.roomId } }, orderBy: { order: 'ASC' } })

        return Result.success<PlayerWithoutPassword[]>(players.map(player => this.removePasswordAttributesPlayer(player)))
    }

    findManyByGameId(data: { gameId: ID }) {
        const responseRoom = this.roomQueryUC.getRoomByGameId(data)

        if (!responseRoom.isSuccess()) {
            // @ts-expect-error
            return responseRoom as Result<PlayerWithoutPassword[]>
        }

        const players = this.playerRepository.findMany({ where: { roomId: { equals: responseRoom.getValue().id } }, orderBy: { order: 'ASC' } })

        return Result.success<PlayerWithoutPassword[]>(players.map(player => this.removePasswordAttributesPlayer(player)))
    }

    private removePasswordAttributesPlayer(player: Partial<Player>) {
        return removeAttributesOfObject({ ...player }, 'password') as PlayerWithoutPassword
    }

    private removeGeneralAttributesPlayer(player: Partial<Player>) {
        return removeAttributesOfObject({ ...player }, 'password', 'blindType', 'isDealer', 'isCurrentBidding', 'isDealer', 'order', 'status', 'roomId') as PlayerInfo
    }
}
