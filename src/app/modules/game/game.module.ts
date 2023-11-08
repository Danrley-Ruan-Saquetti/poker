import { Module } from '@common/module/decorator'
import { GameController } from '@modules/game/game.controller'
import { GameRepository } from '@modules/game/game.repository'
import { GameService } from '@modules/game/game.service'

@Module({
    controllers: [GameController],
    providers: [GameRepository, GameService]
})
export class GameModule { }
