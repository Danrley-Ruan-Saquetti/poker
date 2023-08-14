import { PlayerController } from '../player/player.controller'
import { PlayerModel } from '../player/player.entity'
import { RoomController } from '../room/room.controller'
import { GameController } from './game.controller'
import { GameId } from './game.entity'

export class Game {
    private gameController: GameController
    private roomController: RoomController
    private playerController: PlayerController

    constructor(
        private idGame: GameId
    ) {
        this.gameController = new GameController()
        this.roomController = new RoomController()
        this.playerController = new PlayerController()
    }

    initComponents() {
        this.roomController.createRoom(this.idGame)
    }

    newPlayer({ money, name }: Omit<PlayerModel, 'id' | 'roomId'>) {
        const player = this.playerController.createPlayer({ money, name, roomId: this.getState().room.id })

        return player
    }

    getState() {
        const room = this.roomController.getRoomByIdGame(this.idGame)

        if (!room) { throw new Error(`Room of game ${this.idGame} not found`) }

        const players = this.playerController.getPlayerByIdRoom(room.id)

        return { room, players }
    }
}
