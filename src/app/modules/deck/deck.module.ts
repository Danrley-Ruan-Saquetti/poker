import { Module } from '@common/module/decorator'
import { DeckUseCaseModule } from '@modules/deck/use-case/use-case.module'
import { DeckController } from '@modules/deck/deck.controller'
import { DeckRepository } from '@modules/deck/deck.repository'

@Module({
    imports: [DeckUseCaseModule],
    controllers: [DeckController],
    providers: [DeckRepository]
})
export class DeckModule { }
