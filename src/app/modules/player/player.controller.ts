import { Injection } from '@esliph/injection'
import { Request, Response } from '@esliph/http'
import { GUARD_AUTHORIZATION } from '@constants'
import { Get, Post } from '@common/http'
import { Controller, Guard } from '@common/module/decorator'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'
import { PlayerCreateUseCase } from '@modules/player/use-case/create.use-case'
import { PlayerJoinGameUseCase } from '@modules/player/use-case/join-game.use-case'

@Controller()
export class PlayerController {
    constructor(
        @Injection.Inject('player.use-case.query') private queryUC: PlayerQueryUseCase,
        @Injection.Inject('player.use-case.create') private createUC: PlayerCreateUseCase,
        @Injection.Inject('player.use-case.join-game') private joinGameUC: PlayerJoinGameUseCase,
    ) { }

    @Post('/players/create')
    create(req: Request, res: Response) {
        return this.createUC.perform(req.body)
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Post('/players/join-game')
    joinGame(req: Request, res: Response) {
        return this.joinGameUC.joinGameByRoomId({ playerId: req.headers.playerId, roomId: req.params.roomId })
    }

    @Get('/players')
    findAll(req: Request, res: Response) {
        return this.queryUC.queryMany()
    }

    @Get('/players?:roomId')
    findManyByIdRoom(req: Request, res: Response) {
        return this.queryUC.queryManyByRoomId({ roomId: req.params.roomId })
    }

    @Get('/players?:gameId')
    findManyByIdGame(req: Request, res: Response) {
        return this.queryUC.queryManyByGameId({ gameId: req.params.gameId })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Get('/players?:id')
    findFirst(req: Request, res: Response) {
        return this.queryUC.queryById({ id: req.params.playerId })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Get('/players/current')
    findMe(req: Request, res: Response) {
        return this.queryUC.queryById({ id: req.headers.playerId })
    }
}
