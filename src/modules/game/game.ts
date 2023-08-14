import { RULES_GAME } from '../../common/rules'
import { PlayerController } from '../player/player.controller'
import { PlayerModel } from '../player/player.entity'
import { RoomController } from '../room/room.controller'
import { RoomId } from '../room/room.entity'
import { GameController } from './game.controller'
import { GameId } from './game.entity'

export class Game {
    private gameController: GameController
    private roomController: RoomController
    private playerController: PlayerController
    private idRoom: RoomId

    constructor(
        private idGame: GameId
    ) {
        this.gameController = new GameController()
        this.roomController = new RoomController()
        this.playerController = new PlayerController()
    }

    initComponents() {
        this.idRoom = this.roomController.createRoom(this.idGame).id
    }

    newPlayer({ money, name }: Omit<PlayerModel, 'id' | 'room'>) {
        if (!this.validNewPlayer()) {
            throw new Error('Cannot add player because max length players exceeded')
        }

        const player = this.playerController.createPlayer({
            money, name, room: {
                id: this.getState().room.id,
                order: this.getOrder()
            }
        })

        return player
    }

    getOrder() {
        const { players } = this.getPlayers()

        if (!this.validNewPlayer()) {
            throw new Error('Cannot get order because max length players exceeded')
        }

        let order: number

        do {
            order = Math.round(Math.random() * (RULES_GAME.maxLengthPlayersInRoom - 1)) + 1
        } while (players.find(player => player.room.order == order))

        return order
    }

    getRoom() {
        const room = this.roomController.getRoomByIdGame(this.idGame)

        if (!room) { throw new Error(`Room of game ${this.idGame} not found`) }

        return { room }
    }

    getPlayers() {
        const players = this.playerController.getPlayersByIdRoom(this.idRoom)

        return { players }
    }

    getState() {
        const { players } = this.getPlayers()
        const { room } = this.getRoom()

        return { room, players }
    }

    private validNewPlayer() {
        return this.getPlayers().players.length < RULES_GAME.maxLengthPlayersInRoom
    }
}
