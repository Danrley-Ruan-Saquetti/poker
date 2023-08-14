import { RoomId } from '../room/room.entity'

export type PlayerId = number

export interface PlayerModel {
    id: PlayerId
    name: string
    money: number
    room: {
        id: RoomId,
        order: number
    }
}

export class PlayerEntity implements PlayerModel {
    id: PlayerId
    name: string
    money: number
    room: {
        id: RoomId,
        order: number
    }

    constructor({ id, money, name, room }: PlayerModel) {
        this.id = id
        this.money = money
        this.name = name
        this.room = room
    }
}
