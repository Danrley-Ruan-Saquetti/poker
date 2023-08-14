import { CardController } from '../card/card.controller'
import { RoomId } from '../room/room.entity'
import { Deck, DeckId } from './deck'
import { DeckRepository } from './deck.repository'

export class DeckController {
    private static repository = new DeckRepository()
    private cardController: CardController

    constructor() {
        this.cardController = new CardController()
    }

    generateDeckInRepository() {
        this.cardController.generateCard()
    }

    createDeck(roomId: RoomId) {
        const cards = this.cardController.getCards()

        const deckDoc = DeckController.repository.add({ cards: cards.map(({ id }) => ({ id, inDeck: true })), roomId })

        const deck = new Deck(deckDoc)

        return deck
    }

    removeDeckById(args: Deck) {
        DeckController.repository.removeById(args.id)
    }

    updateDeckById(args: Deck) {
        DeckController.repository.updateById(args.id, args)
    }

    getDeckById(id: DeckId) {
        return DeckController.repository.findById(id)
    }

    getDeckByIdRoom(roomId: RoomId) {
        return DeckController.repository.findFirst({ roomId })
    }

    getAllDecks() {
        return DeckController.repository.findAll()
    }
}
