import { Module } from '@common/module/decorator'
import { GameModeController } from '@modules/game-mode/game-mode.controller'

@Module({
    imports: [],
    controllers: [GameModeController],
    providers: []
})
export class GameModeModule { }
