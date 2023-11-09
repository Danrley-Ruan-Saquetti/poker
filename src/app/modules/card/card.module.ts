import { Module } from '@common/module/decorator'
import { CardUseCaseModule } from '@modules/card/use-case/use-case.module'
import { CardController } from '@modules/card/card.controller'
import { CardRepository } from '@modules/card/card.repository'
import { CardService } from '@modules/card/card.service'

@Module({
    imports: [CardUseCaseModule],
    controllers: [CardController],
    providers: [CardRepository, CardService]
})
export class CardModule { }
