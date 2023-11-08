import { Injection } from '@esliph/injection'
import { GameService } from '@modules/game/game.service'
import { Controller } from '@common/module/decorator'
import { Guard } from '@common/module/decorator'
import { Post } from '@common/http'
import { Request } from '@esliph/http'

@Controller()
export class GameController {
    constructor(
        @Injection.Inject('game.service') private gameService: GameService
    ) { }

    @Guard({ name: 'authorization' })
    @Post('/games/create')
    create(req: Request) {
        const game = this.gameService.create({ playerId: req.headers.playerId })

        return game
    }
}
