import { Controller } from '@common/module/decorator'
import { Injection } from '@esliph/injection'
import { GameModeService } from '@modules/game-mode/game-mode.service'
import { OnEvent } from '@common/event/decorator'
import { GameType } from '@modules/game/game.model'
import { ID } from '@@types/index'

@Controller()
export class GameModeController {
    constructor(
        @Injection.Inject('game-mode.service') private gameModeService: GameModeService
    ) { }

    @OnEvent('game.create')
    createGame(data: { playerId: ID, type: GameType, gameId: ID }) {
        this.gameModeService.createGame(data)
    }
}
