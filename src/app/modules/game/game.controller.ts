import { GameJoinGameUseCase } from '@modules/game/use-case/join-game.use-case'
import { Request } from '@esliph/http'
import { Injection } from '@esliph/injection'
import { Get, Post } from '@common/http'
import { Controller, Guard } from '@common/module/decorator'
import { GUARD_AUTHORIZATION } from '@constants'
import { GameService } from '@modules/game/game.service'
import { GameCreateUseCase } from '@modules/game/use-case/create.use-case'

@Controller()
export class GameController {
    constructor(
        @Injection.Inject('game.service') private gameService: GameService,
        @Injection.Inject('game.use-case.create') private createUC: GameCreateUseCase,
        @Injection.Inject('game.use-case.join-game') private joinGameUC: GameJoinGameUseCase
    ) { }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Post('/games/create')
    create(req: Request) {
        return this.createUC.perform({ playerId: req.headers.playerId, type: req.body.gameType })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Post('/games/join')
    joinGame(req: Request) {
        return this.joinGameUC.perform({ playerId: req.headers.playerId, roomId: req.params.roomId })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Get('/games/players')
    getPlayers(req: Request) {
        return this.gameService.getPlayersByGameId({ gameId: req.params.gameId })
    }
}
