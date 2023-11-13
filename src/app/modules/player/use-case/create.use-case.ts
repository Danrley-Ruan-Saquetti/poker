import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { Service } from '@common/module/decorator'
import { PlayerRepository } from '@modules/player/player.repository'
import { PlayerModel, PlayerStatus } from '@modules/player/player.model'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'

@Service({ name: 'player.use-case.create', context: 'Use Case' })
export class PlayerCreateUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('player.use-case.query') private playerQueryUC: PlayerQueryUseCase
    ) {}

    perform(data: PlayerModel) {
        if (this.playerQueryUC.findByLogin({ login: data.login }).isSuccess()) {
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
                roomId: null
            }
        })

        return Result.success<{ ok: boolean }>({ ok: true })
    }
}
