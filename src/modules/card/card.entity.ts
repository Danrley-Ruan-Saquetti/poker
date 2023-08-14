export enum CardSuit {
    Hearts = 'Hearts',
    Spades = 'Spades',
    Clubs = 'Clubs',
    Diamonds = 'Diamonds'
}

export type CardId = number

export interface CardModel {
    id: CardId
    number: number
    suit: CardSuit
}

export class Card implements CardModel {
    id: CardId
    number: number
    suit: CardSuit

    constructor({ number, suit, id }: CardModel) {
        this.id = id
        this.number = number
        this.suit = suit
    }
}
