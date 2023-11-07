import { Service } from '@common/module/decorator'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { PlayerModel, PlayerStatus } from '@modules/player/player.model'
import { PlayerRepository } from '@modules/player/player.repository'

@Service({ name: 'player.service' })
export class PlayerService {

    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
    ) {}

    create(data: PlayerModel) {
        if (this.playerRepository.isExists({where: { login: { equals: data.login } }})) {
            return Result.failure<{ ok: boolean }>({title: 'Create Player', message: `Login ${data.login} is already exists`})
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

    findAll() {
        return this.playerRepository.findMany()
    }
}
