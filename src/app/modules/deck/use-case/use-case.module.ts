import { Module } from '@common/module/decorator'
import { DeckCreateUseCase } from '@modules/deck/use-case/create.use-case'
import { DeckQueryUseCase } from '@modules/deck/use-case/query.use-case'
import { DeckFindUseCase } from '@modules/deck/use-case/find.use-case'
import { GameFindUseCase } from '@modules/game/use-case/find.use-case'

@Module({
    providers: [DeckCreateUseCase, DeckQueryUseCase, DeckFindUseCase, GameFindUseCase]
})
export class DeckUseCaseModule {}
