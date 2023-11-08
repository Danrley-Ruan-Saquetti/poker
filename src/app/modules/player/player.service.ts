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

    findById(id: number) {
        const player = this.playerRepository.findFirst({ where: { id: { equals: id } } })

        if (!player) {
            return Result.failure({ title: 'Find Player', message: 'Cannot found player' })
        }

        return Result.success<Omit<Player, 'password'>>(removeAttributesOfObject({ ...player }, 'password'))
    }

    findAll() {
        return Result.success<Player[]>(this.playerRepository.findMany())
    }

    update(args: UpdateArgs<Player>) {
        this.playerRepository.update(args)
    }

    updateMany(args: UpdateManyArgs<Player>) {
        this.playerRepository.updateMany(args)
    }
}
