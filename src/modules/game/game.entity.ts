export type GameId = number

export interface GameModel {
    id: GameId
    isRunning: boolean
    currentDealer: number
    currentPlayerBetting: number
    biggestBet: number
    playerCheckpointBiggestBet: number
}

export class GameEntity implements GameModel {
    id: GameId
    isRunning: boolean
    currentDealer: number
    currentPlayerBetting: number
    biggestBet: number
    playerCheckpointBiggestBet: number

    constructor({ currentPlayerBetting, id, isRunning, currentDealer, biggestBet, playerCheckpointBiggestBet }: GameModel) {
        this.currentPlayerBetting = currentPlayerBetting
        this.id = id
        this.isRunning = isRunning
        this.currentDealer = currentDealer
        this.biggestBet = biggestBet
        this.playerCheckpointBiggestBet = playerCheckpointBiggestBet
    }
}
