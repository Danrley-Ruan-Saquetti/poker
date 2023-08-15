import { CardController } from '../card/card.controller'
import { CardId } from '../card/card.entity'
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

    updateDeckById(id: DeckId, args: Partial<Omit<Deck, 'id'>>) {
        DeckController.repository.updateById(id, args)
    }

    updateCardById(deckId: DeckId, cardId: CardId, args: Partial<Omit<{ inDeck?: boolean }, 'id'>>) {
        const deck = this.getDeckById(deckId)

        if (!deck) {
            return
        }

        const cardIndex = deck.cards.findIndex(card => card.id == cardId)

        if (cardIndex < 0) {
            return
        }

        deck.cards[cardIndex] = {
            ...deck.cards[cardIndex],
            ...args
        }
    }

    getDeckById(id: DeckId) {
        return DeckController.repository.findById(id)
    }

    getDeckByIdRoom(roomId: RoomId) {
        return DeckController.repository.findFirst({ roomId })
    }

    getCardsByIdDeck(deckId: DeckId) {
        const deck = DeckController.repository.findById(deckId)

        if (!deck) {
            return []
        }

        return this.cardController.getCardsById(deck.cards.map(({ id }) => id))
    }

    getCardsInDeck(deckId: DeckId) {
        return this.getCardsByIdDeckAndIsInDeck(deckId, true)
    }

    getCardsInNotDeck(deckId: DeckId) {
        return this.getCardsByIdDeckAndIsInDeck(deckId, false)
    }

    getCardsByIdDeckAndIsInDeck(deckId: DeckId, inDeck: boolean) {
        const deck = DeckController.repository.findById(deckId)

        if (!deck) {
            return []
        }

        const cardsInDeck = deck.cards.filter(card => card.inDeck == inDeck)

        return this.cardController.getCardsById(cardsInDeck.map(card => card.id))
    }

    getAllDecks() {
        return DeckController.repository.findAll()
    }
}
