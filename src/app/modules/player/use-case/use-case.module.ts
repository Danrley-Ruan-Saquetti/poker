import { Module } from '@common/module/decorator'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'
import { PlayerCreateUseCase } from '@modules/player/use-case/create.use-case'
import { PlayerInGameUseCase } from '@modules/player/use-case/in-game.use-case'

@Module({
    providers: [PlayerQueryUseCase, PlayerCreateUseCase, PlayerInGameUseCase]
})
export class PlayerUseCaseModule { }
