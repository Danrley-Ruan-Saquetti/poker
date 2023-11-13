import { Module } from '@common/module/decorator'
import { GameUseCaseModule } from '@modules/game/use-case/use-case.module'
import { GameController } from '@modules/game/game.controller'
import { GameRepository } from '@modules/game/game.repository'
import { GameValidateDTO } from '@modules/game/dto'

@Module({
    imports: [GameUseCaseModule],
    controllers: [GameController],
    providers: [GameValidateDTO, GameRepository]
})
export class GameModule {}
