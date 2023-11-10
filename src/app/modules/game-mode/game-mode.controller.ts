import { Injection } from '@esliph/injection'
import { Controller } from '@common/module/decorator'
import { OnEvent } from '@common/event/decorator'
import { ID } from '@@types/index'
import { Emitter } from '@services/observer.service'

@Controller()
export class GameModeController {
    constructor(
        @Injection.Inject('observer.emitter') private emitter: Emitter,
    ) { }

    @OnEvent('game.start')
    startGame(data: { gameId: ID }) {

    }
}
