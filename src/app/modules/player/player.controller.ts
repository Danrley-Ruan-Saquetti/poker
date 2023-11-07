import { Injection } from '@esliph/injection';
import { Controller } from '@common/module/decorator'
import { PlayerService } from '@modules/player/player.service';
import { OnEvent } from '@common/event';

@Controller()
export class PlayerController {
    constructor(@Injection.Inject('player.service') private playerService: PlayerService) {}

    @OnEvent('/player/create')
    create() {
        console.log(this.playerService.create())
    }
}
