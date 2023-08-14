import { RULES_GAME } from 'src/common/rules'
import { Card, CardId, CardModel, CardSuit } from './card.entity'
import { CardRepository } from './card.repository'

export class CardController {
    private static repository = new CardRepository()

    createCard({ number, suit }: Omit<CardModel, 'id'>) {
        const cardDoc = CardController.repository.add({ number, suit })

        const card = new Card(cardDoc)

        return card
    }

    generateCard() {
        const cards: Card[] = []

        for (let i = 0; i < RULES_GAME.maxSuitLength; i++) {
            const suit = Object.keys(CardSuit)[i] as CardSuit

            for (let j = 0; j < RULES_GAME.maxCardLengthForSuit; j++) {
                cards.push(this.createCard({ number: j + 1, suit }))
            }
        }

        return cards
    }

    getCardById(id: CardId) {
        return CardController.repository.findById(id)
    }

    getCardsById(ids: CardId[]) {
        return CardController.repository.findManyWithOr(ids.map(id => ({ id })))
    }

    getCards() {
        return CardController.repository.findAll()
    }
}
