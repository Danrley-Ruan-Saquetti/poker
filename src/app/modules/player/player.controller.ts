import {} from '@esliph/observer'
import { Controller } from '@common/decorator'
import { Injection } from '@esliph/injection'
import { PlayerService } from '@modules/player/player.service'

@Controller()
export class PlayerController {
    constructor(@Injection.Inject('player.service') private service: PlayerService) {}
}
