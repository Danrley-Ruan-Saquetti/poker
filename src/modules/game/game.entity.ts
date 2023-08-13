import { RoomId } from '../room/room.entity'

export type GameId = number

export interface GameModel {
    id: GameId
    room: RoomId
}

export class GameEntity implements GameModel {
    id: GameId
    room: RoomId
}
