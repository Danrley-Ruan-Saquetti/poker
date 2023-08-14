import { RoomId } from '../room/room.entity'

export type GameId = number

export interface GameModel {
    id: GameId
}

export class GameEntity implements GameModel {

    constructor(
        public id: GameId,
    ) { }
}
