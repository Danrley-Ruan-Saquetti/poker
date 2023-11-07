import { Service } from '@common/module/decorator'
import { Injection } from '@esliph/injection'
import { PlayerModel } from '@modules/player/player.model'
import { PlayerRepository } from '@modules/player/player.repository'

@Service({ name: 'player.service' })
export class PlayerService {

    constructor(@Injection.Inject('player.repository') private playerRepository: PlayerRepository) {}

    create(data: PlayerModel) {
        const player = this.playerRepository.create({ data })

        return player
    }
}
