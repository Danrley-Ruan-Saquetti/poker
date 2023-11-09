import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { Service } from '@common/module/decorator'
import { PlayerRepository } from '@modules/player/player.repository'
import { PlayerModel, PlayerStatus } from '@modules/player/player.model'

@Service({ name: 'player.use-case.create', context: 'Use Case' })
export class PlayerCreateUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
    ) { }

    perform(data: PlayerModel) {
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
}
