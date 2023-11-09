import { Module } from '@common/module/decorator'
import { GameQueryUseCase } from '@modules/game/use-case/query.use-case'
import { GameCreateUseCase } from '@modules/game/use-case/create.use-case'
import { GameJoinGameUseCase } from '@modules/game/use-case/join-game.use-case'

@Module({
    providers: [GameQueryUseCase, GameCreateUseCase, GameJoinGameUseCase]
})
export class GameUseCaseModule { }
