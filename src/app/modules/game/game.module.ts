import { Module } from '@common/module/decorator'
import { GameUseCaseModule } from '@modules/game/use-case/use-case.module'
import { GameController } from '@modules/game/game.controller'
import { GameRepository } from '@modules/game/game.repository'
import { GameService } from '@modules/game/game.service'

@Module({
    imports: [GameUseCaseModule],
    controllers: [GameController],
    providers: [GameRepository, GameService]
})
export class GameModule { }
