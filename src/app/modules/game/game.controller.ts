import { Request } from '@esliph/http'
import { Injection } from '@esliph/injection'
import { GameService } from '@modules/game/game.service'
import { Controller } from '@common/module/decorator'
import { Guard } from '@common/module/decorator'
import { Get, Post } from '@common/http'

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

    @Guard({ name: 'authorization' })
    @Post('/games/join')
    joinGame(req: Request) {
        return this.gameService.joinGame({ playerId: req.headers.playerId, roomId: req.params.roomId })
    }

    @Guard({ name: 'authorization' })
    @Get('/games/players')
    getPlayers(req: Request) {
        return this.gameService.getPlayersByGameId({ gameId: req.params.gameId })
    }
}
