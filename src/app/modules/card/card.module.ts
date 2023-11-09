import { Module } from '@common/module/decorator'
import { CardUseCaseModule } from '@modules/card/use-case/use-case.module'
import { CardController } from '@modules/card/card.controller'
import { CardRepository } from '@modules/card/card.repository'

@Module({
    imports: [CardUseCaseModule],
    controllers: [CardController],
    providers: [CardRepository]
})
export class CardModule { }
