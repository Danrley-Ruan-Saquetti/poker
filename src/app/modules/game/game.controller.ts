import { Injection } from '@esliph/injection'
import { Controller } from '@common/module/decorator'
import { GameService } from '@modules/game/game.service'

@Controller()
export class GameController {
    constructor(
        @Injection.Inject('game.service') private gameService: GameService
    ) { }

}
