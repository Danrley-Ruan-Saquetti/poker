import { Module } from '@common/module/decorator'
import { DeckCreateUseCase } from '@modules/deck/use-case/create.use-case'

@Module({
    providers: [DeckCreateUseCase]
})
export class DeckUseCaseModule { }
