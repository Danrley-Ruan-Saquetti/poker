import { Document } from '@esliph/repository-memory'
import { Deck } from '@modules/deck/deck.model'
import { PlayerWithoutPassword } from '@modules/player/player.model'
import { Room } from '@modules/room/room.model'

export enum GameType {
    TEXAS_HOLDEM = 'TEXAS_HOLDEM'
}

export type GameModel = {
    isRunning: boolean
    type: GameType
}

export type Game = Document<GameModel>

export type GameState = {
    game: Game
    room: Room
    players: PlayerWithoutPassword[]
    deck: Deck
}
