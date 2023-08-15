import { GameId } from '../game/game.entity'
import { PlayerController } from '../player/player.controller'
import { RoomEntity, RoomId, RoomModel } from './room.entity'
import { RoomRepository } from './room.repository'

export class RoomController {
    private static repository = new RoomRepository()
    private playerController: PlayerController

    constructor() {
        this.playerController = new PlayerController()
    }

    createRoom(gameId: GameId) {
        const roomDoc = this.repository.create({ gameId })

        const room = new RoomEntity(roomDoc.id, roomDoc.gameId)

        return room
    }

    updateRoomById(args: RoomModel) {
        this.repository.updateById(args.id, args)
    }

    getRoomById(id: RoomId) {
        return this.repository.findById(id)
    }

    getRoomsByd(ids: RoomId[]) {
        return this.repository.findManyWithOr(ids.map(id => ({ id })))
    }

    getRoomByIdGame(gameId: GameId) {
        return this.repository.findFirst({ gameId })
    }

    private get repository() {
        return RoomController.repository
    }
}
