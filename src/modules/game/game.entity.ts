import { RoomId } from '../room/room.entity'

export type GameId = number

export interface GameModel {
    id: GameId
    isRunning: boolean
    lastDealer: number
}

export class GameEntity implements GameModel {
    constructor(public id: GameId, public isRunning: boolean,  public lastDealer: number) {}
}
