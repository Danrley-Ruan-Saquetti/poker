import { PlayerId } from '../player/player.entity'

export type RoomId = number

export interface RoomModel {
    id: RoomId
    players: PlayerId[]
}

export class RoomEntity implements RoomModel {
    id: RoomId
    players: PlayerId[]
}
