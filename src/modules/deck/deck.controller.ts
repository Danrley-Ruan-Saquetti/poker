import { CardController } from '../card/card.controller'
import { CardId } from '../card/card.entity'
import { RoomId } from '../room/room.entity'
import { Deck, DeckId } from './deck.entity'
import { DeckRepository } from './deck.repository'

export class DeckController {
    private static repository = new DeckRepository()
    private cardController: CardController

    constructor() {
        this.cardController = new CardController()
    }

    generateDeckInRepository() {
        this.cardController.generateCards()
    }

    createDeck(roomId: RoomId) {
        const cards = this.cardController.getAllCards()

        const deckDoc = this.repository.create({ data: { cards: cards.map(({ id }) => ({ id, inDeck: true })), roomId } })

        const deck = new Deck(deckDoc)

        return deck
    }

    removeDeckById(args: Deck) {
        this.repository.delete({ where: { id: args.id } })
    }

    updateDeckById(id: DeckId, args: Partial<Omit<Deck, 'id'>>) {
        this.repository.update({ where: { id }, data: { ...args } })
    }

    updateCardById(deckId: DeckId, cardId: CardId, args: Partial<Omit<{ inDeck?: boolean }, 'id'>>) {
        const deck = this.getDeckById(deckId)
        const cardIndex = this.getIndexCardByIdAndDeck(deckId, cardId)

        if (!deck || cardIndex < 0) {
            return
        }

        deck.cards[cardIndex] = {
            ...deck.cards[cardIndex],
            ...args
        }

        this.repository.update({ where: { id: deckId }, data: { cards: deck.cards } })
    }

    getCardByIdAndDeck(deckId: DeckId, cardId: CardId) {
        const deck = this.getDeckById(deckId)

        if (!deck) {
            return null
        }

        const cardIndex = deck.cards.findIndex(card => card.id == cardId)

        if (cardIndex < 0) {
            return null
        }

        return deck.cards[cardIndex]
    }

    getIndexCardByIdAndDeck(deckId: DeckId, cardId: CardId) {
        const deck = this.getDeckById(deckId)

        if (!deck) {
            return -1
        }

        const cardIndex = deck.cards.findIndex(card => card.id == cardId)

        return cardIndex
    }

    getDeckById(id: DeckId) {
        return this.repository.findFirst({ where: { id } })
    }

    getDeckByIdRoom(roomId: RoomId) {
        return this.repository.findFirst({ where: { roomId } })
    }

    getCardsByIdDeck(deckId: DeckId) {
        const deck = this.repository.findFirst({ where: { id: deckId } })

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
        const deck = this.repository.findFirst({ where: { id: deckId } })

        if (!deck) {
            return []
        }

        const cardsInDeck = deck.cards.filter(card => card.inDeck == inDeck)

        return this.cardController.getCardsById(cardsInDeck.map(card => card.id))
    }

    getAllDecks() {
        return this.repository.findAll()
    }

    private get repository() {
        return DeckController.repository
    }
}
