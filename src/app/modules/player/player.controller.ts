import { Injection } from '@esliph/injection'
import { Request, Response } from '@esliph/http'
import { Controller, Guard } from '@common/module/decorator'
import { PlayerService } from '@modules/player/player.service'
import { Get, Post } from '@common/http'
import { GUARD_AUTHORIZATION } from '@constants'

@Controller()
export class PlayerController {
    constructor(
        @Injection.Inject('player.service') private playerService: PlayerService,
    ) { }

    @Post('/players/create')
    create(req: Request, res: Response) {
        return this.playerService.create(req.body)
    }

    @Get('/players')
    findAll(req: Request, res: Response) {
        return this.playerService.findAll()
    }

    @Get('/players/find-room')
    findManyByIdRoom(req: Request, res: Response) {
        return this.playerService.findManyByRoomId({ roomId: req.params.roomId })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Get('/players/:id')
    findFirst(req: Request, res: Response) {
        return this.playerService.findById({ playerId: req.params.playerId })
    }

    @Guard({ name: GUARD_AUTHORIZATION })
    @Get('/players/current')
    findMe(req: Request, res: Response) {
        return this.playerService.findById({ playerId: req.headers.playerId })
    }
}
