import { Get } from '@common/http'
import { Controller } from '@common/module/decorator'
import { Injection } from '@esliph/injection'
import { PlayerService } from '@modules/player/player.service'

@Controller()
export class PlayerController {
    constructor(@Injection.Inject('player.service') private service: PlayerService) {}

    @Get('/hello')
    async hello(req, res) {
        return { hello: 'world' }
    }

    world() {}
}
