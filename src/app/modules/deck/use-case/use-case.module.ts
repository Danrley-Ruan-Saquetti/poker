import { Module } from '@common/module/decorator'
import { DeckCreateUseCase } from '@modules/deck/use-case/create.use-case'
import { DeckQueryUseCase } from '@modules/deck/use-case/query.use-case'

@Module({
    providers: [DeckCreateUseCase, DeckQueryUseCase]
})
export class DeckUseCaseModule { }
