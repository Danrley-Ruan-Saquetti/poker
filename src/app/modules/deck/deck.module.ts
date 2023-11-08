import { Module } from '@common/module/decorator'
import { DeckController } from '@modules/deck/deck.controller'
import { DeckRepository } from '@modules/deck/deck.repository'
import { DeckService } from '@modules/deck/deck.service'

@Module({
    controllers: [DeckController],
    provider: [DeckRepository, DeckService]
})
export class DeckModule {}
