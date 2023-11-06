import { Document } from '@esliph/repository-memory'

export type GameModel = {
    isRunning: boolean
}

export type Game = Document<GameModel>
