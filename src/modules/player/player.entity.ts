import { CardId } from '../card/card.entity'
import { RoomId } from '../room/room.entity'

export type PlayerId = number

export interface PlayerModel {
    id: PlayerId
    name: string
    money: number
    cards: CardId[]
    active: boolean
    inGame: boolean
    isDealer: boolean
    isBetting: boolean
    room: {
        id: RoomId
        order: number
    }
}

export class PlayerEntity implements PlayerModel {
    id: PlayerId
    name: string
    money: number
    cards: CardId[]
    active: boolean
    inGame: boolean
    isDealer: boolean
    isBetting: boolean
    room: {
        id: RoomId
        order: number
    }

    constructor({ id, money, name, room, cards, active, isDealer, inGame, isBetting }: PlayerModel) {
        this.id = id
        this.inGame = inGame
        this.isDealer = isDealer
        this.money = money
        this.name = name
        this.room = room
        this.cards = cards
        this.active = active
        this.isBetting = isBetting
    }
}
