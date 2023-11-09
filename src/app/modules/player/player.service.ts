import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { UpdateArgs, UpdateManyArgs } from '@esliph/repository-memory'
import { Player, PlayerModel, PlayerStatus } from '@modules/player/player.model'
import { PlayerRepository } from '@modules/player/player.repository'
import { removeAttributesOfObject } from '@util'

@Service({ name: 'player.service' })
export class PlayerService {

    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
    ) { }

    create(data: PlayerModel) {
        if (this.playerRepository.isExists({ where: { login: { equals: data.login } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Player', message: `Login ${data.login} is already exists` })
        }

        this.playerRepository.create({
            data: {
                ...data,
                blindType: null,
                isDealer: false,
                isCurrentBidding: false,
                order: 0,
                status: PlayerStatus.AWAY,
                roomId: null,
            }
        })

        return Result.success<{ ok: boolean }>({ ok: true })
    }

    isInGame(data: { playerId: ID }) {
        const resultPlayer = this.findById(data)

        if (!resultPlayer.isSuccess()) {
            return Result.inherit<{ inGame: boolean }>(resultPlayer.getResponse() as any)
        }

        return Result.success<{ inGame: boolean }>({ inGame: !!resultPlayer.getValue().roomId })
    }

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

    update(data: UpdateArgs<Player>) {
        this.playerRepository.update(data)
    }

    updateMany(data: UpdateManyArgs<Player>) {
        this.playerRepository.updateMany(data)
    }

    joinGame(data: { playerId: ID, roomId: ID }) {
        this.playerRepository.update({ where: { id: { equals: data.playerId } }, data: { roomId: data.roomId } })
    }
}
