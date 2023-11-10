import { Request } from '@esliph/http'
import { Injection } from '@esliph/injection'
import { Get, Post } from '@common/http'
import { Controller, Guard } from '@common/module/decorator'
import { GUARD_AUTHORIZATION } from '@constants'
import { GameCreateUseCase } from '@modules/game/use-case/create.use-case'

@Controller()
export class GameController {
    constructor(
        @Injection.Inject('game.use-case.create') private createUC: GameCreateUseCase,
    ) { }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Post('/games/create')
    create(req: Request) {
        return this.createUC.perform({ playerId: req.headers.playerId, type: req.body.gameType })
    }
}
