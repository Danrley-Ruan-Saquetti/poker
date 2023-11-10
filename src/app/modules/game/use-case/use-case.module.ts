import { Module } from '@common/module/decorator'
import { GameQueryUseCase } from '@modules/game/use-case/query.use-case'
import { GameCreateUseCase } from '@modules/game/use-case/create.use-case'

@Module({
    providers: [GameQueryUseCase, GameCreateUseCase]
})
export class GameUseCaseModule { }
