import { Request } from '@esliph/http'
import { Injection } from '@esliph/injection'
import { GUARD_AUTHORIZATION } from '@constants'
import { Get, Post } from '@common/http'
import { Controller, Guard } from '@common/module/decorator'
import { GameStateUseCase } from '@modules/game/use-case/state.use-case'
import { GameCreateUseCase } from '@modules/game/use-case/create.use-case'
import { GameQueryUseCase } from '@modules/game/use-case/query.use-case'

@Controller()
export class GameController {
    constructor(
        @Injection.Inject('game.use-case.create') private createUC: GameCreateUseCase,
        @Injection.Inject('game.use-case.state') private stateUC: GameStateUseCase
    ) { }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Post('/games/create')
    create(req: Request) {
        return this.createUC.perform({ playerId: req.headers.playerId, type: req.body.gameType })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Get('/games/state')
    getState(req: Request) {
        return this.stateUC.getStateByRoomId({ roomId: req.params.roomId })
    }
}
