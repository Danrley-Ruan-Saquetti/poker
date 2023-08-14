import { GameId } from '../game/game.entity'

export type RoomId = number

export interface RoomModel {
    id: RoomId
    gameId: GameId
}

export class RoomEntity implements RoomModel {

    constructor(
        public id: RoomId,
        public gameId: GameId,
    ) { }
}
