import { Module } from '@common/module/decorator'
import { CardController } from '@modules/card/card.controller'
import { CardRepository } from '@modules/card/card.repository'
import { CardService } from '@modules/card/card.service'

@Module({
    controllers: [CardController],
    provider: [CardRepository, CardService]
})
export class CardModule {}
