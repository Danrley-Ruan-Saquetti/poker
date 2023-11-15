import { ID } from '@@types'
import { Document } from '@esliph/repository-memory'

export enum CardSuit {
    HEARTS = 'HEARTS',
    SPADES = 'SPADES',
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS'
}

export interface CardModel {
    deckId: ID
    number: number
    suit: CardSuit
    inDeck: boolean
}

export type Card = Document<CardModel>
