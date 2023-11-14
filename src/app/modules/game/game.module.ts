import { Module } from '@common/module/decorator'
import { GameUseCaseModule } from '@modules/game/use-case/use-case.module'
import { GameController } from '@modules/game/game.controller'
import { GameRepository } from '@modules/game/game.repository'

@Module({
    imports: [GameUseCaseModule],
    controllers: [GameController],
    providers: [GameRepository]
})
export class GameModule {}
