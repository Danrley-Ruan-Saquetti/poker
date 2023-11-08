import { ID } from '@@types/index'
import { Document } from '@esliph/repository-memory'

export enum CardSuit {
    Hearts = 'Hearts',
    Spades = 'Spades',
    Clubs = 'Clubs',
    Diamonds = 'Diamonds'
}

export interface CardModel {
    deckId: ID
    number: number
    suit: CardSuit
    inDeck: boolean
}

export type Card = Document<CardModel>
