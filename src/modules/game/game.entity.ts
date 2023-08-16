export type GameId = number

export interface GameModel {
    id: GameId
    isRunning: boolean
    currentDealer: number
    currentPlayerBetting: number
}

export class GameEntity implements GameModel {
    id: GameId
    isRunning: boolean
    currentDealer: number
    currentPlayerBetting: number

    constructor({ currentPlayerBetting, id, isRunning, currentDealer }: GameModel) {
        this.currentPlayerBetting = currentPlayerBetting
        this.id = id
        this.isRunning = isRunning
        this.currentDealer = currentDealer
    }
}
