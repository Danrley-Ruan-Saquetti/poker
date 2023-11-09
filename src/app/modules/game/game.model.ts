import { Document } from '@esliph/repository-memory'

export enum GameType {
    TEXAS_HOLDEM = 'TEXAS_HOLDEM'
}

export type GameModel = {
    isRunning: boolean
    type: GameType
}

export type Game = Document<GameModel>
