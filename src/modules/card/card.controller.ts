import { RULES_GAME } from 'src/common/rules'
import { Card, CardId, CardSuit } from './card.entity'
import { CardRepository, CardArgsDefault, CardQueryManyArgs } from './card.repository'

export type { CardArgsDefault }

export class CardController {
    private static repository = new CardRepository()

    createCard({ number, suit }: CardArgsDefault) {
        const cardDoc = this.repository.create({ data: { number, suit } })

        const card = new Card(cardDoc)

        return card
    }

    generateCards() {
        const cards: Card[] = []

        for (let i = 0; i < RULES_GAME.maxSuitLength; i++) {
            const suit = Object.keys(CardSuit)[i] as CardSuit

            for (let j = 0; j < RULES_GAME.maxCardLengthForSuit; j++) {
                cards.push(this.createCard({ number: j + 1, suit }))
            }
        }

        return cards
    }

    getAllCards() {
        return this.repository.findAll()
    }

    query(args: CardQueryManyArgs) {
        return this.repository.findManyAND(args)
    }

    getCardById(id: CardId) {
        return this.repository.findFirst({ where: { id } })
    }

    getCardsById(ids: CardId[]) {
        return this.repository.findManyOR({ where: ids.map(id => ({ id })) })
    }

    private get repository() {
        return CardController.repository
    }
}
