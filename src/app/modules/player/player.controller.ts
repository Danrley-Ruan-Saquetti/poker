import { Injection } from '@esliph/injection';
import { Controller } from '@common/module/decorator'
import { PlayerService } from '@modules/player/player.service';
import { Get, Post } from '@common/http';
import { Request, Response } from '@esliph/http';

@Controller()
export class PlayerController {
    constructor(
        @Injection.Inject('player.service') private playerService: PlayerService,
    ) {}

    @Post('/players/create')
    create(req: Request, res: Response) {
        return this.playerService.create(req.body)
    }

    @Get('/players')
    findAll(req: Request, res: Response) {
        return this.playerService.findAll()
    }
}
