import { Module } from '@common/module/decorator'
import { GameModeController } from '@modules/game-mode/game-mode.controller'
import { GameModeService } from '@modules/game-mode/game-mode.service'

@Module({
    controllers: [GameModeController],
    providers: [GameModeService]
})
export class GameModeModule { }
