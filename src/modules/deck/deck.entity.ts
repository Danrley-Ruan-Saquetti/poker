import { CardId } from '../card/card.entity'
import { RoomId } from '../room/room.entity'

export type DeckId = number

export interface DeckModel {
    id: DeckId
    cards: {id: CardId, inDeck: boolean}[]
    roomId: RoomId
}

export class Deck implements DeckModel {
    id: DeckId
    cards: {id: CardId, inDeck: boolean}[]
    roomId: RoomId

    constructor({ cards, id, roomId }: DeckModel) {
        this.cards = cards
        this.id = id
        this.roomId = roomId
    }
}
