import { Injection } from '@esliph/injection';
import { Controller } from '@common/module/decorator'
import { PlayerService } from '@modules/player/player.service';
import { Post } from '@common/http';
import { Request, Response } from '@esliph/http';

@Controller()
export class PlayerController {
    constructor(
        @Injection.Inject('player.service') private playerService: PlayerService,
    ) {}

    @Post('/player/create')
    create(req: Request, res: Response) {
        const player = this.playerService.create(req.body)

        return player
    }
}
