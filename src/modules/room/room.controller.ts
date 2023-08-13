import { GameController } from '../game/game.controller'
import { PlayerController } from '../player/player.controller'
import { RoomRepository } from './room.repository'

export class RoomController {
    private static repository = new RoomRepository()
    private gameController: GameController
    private playerController: PlayerController

    constructor() {
        this.gameController = new GameController()
        this.playerController = new PlayerController()
    }
}
