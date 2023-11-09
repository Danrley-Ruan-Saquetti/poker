import { Module } from '@common/module/decorator'
import { GameModeController } from '@modules/game-mode/game-mode.controller'
import { GameModeService } from '@modules/game-mode/game-mode.service'
import { GameModeUseCaseModule } from '@modules/game-mode/use-case/use-case.module'

@Module({
    imports: [GameModeUseCaseModule],
    controllers: [GameModeController],
    providers: [GameModeService]
})
export class GameModeModule { }
