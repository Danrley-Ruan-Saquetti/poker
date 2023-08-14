import { CardId } from '../card/card.entity'
import { RoomId } from '../room/room.entity'

export type PlayerId = number

export interface PlayerModel {
    id: PlayerId
    name: string
    money: number
    cards: CardId[]
    room: {
        id: RoomId,
        order: number
    }
}

export class PlayerEntity implements PlayerModel {
    id: PlayerId
    name: string
    money: number
    cards: CardId[]
    room: {
        id: RoomId,
        order: number
    }

    constructor({ id, money, name, room, cards }: PlayerModel) {
        this.id = id
        this.money = money
        this.name = name
        this.room = room
        this.cards = cards
    }
}
