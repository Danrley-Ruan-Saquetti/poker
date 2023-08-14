import { RoomId } from '../room/room.entity'

export type PlayerId = number

export interface PlayerModel {
    id: PlayerId
    name: string
    money: number
    roomId: RoomId
}

export class PlayerEntity implements PlayerModel {
    id: PlayerId
    name: string
    money: number
    roomId: RoomId

    constructor({ id, money, name, roomId }: PlayerModel) {
        this.id = id
        this.money = money
        this.name = name
        this.roomId = roomId
    }
}
