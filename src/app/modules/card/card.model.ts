import { Document } from '@esliph/repository-memory'

export enum CardSuit {
    Hearts = 'Hearts',
    Spades = 'Spades',
    Clubs = 'Clubs',
    Diamonds = 'Diamonds'
}

export interface CardModel {
    number: number
    suit: CardSuit
}

export type Card = Document<CardModel>