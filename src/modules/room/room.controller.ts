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
        const roomDoc = this.repository.create({ data: { gameId } })

        const room = new RoomEntity(roomDoc.id, roomDoc.gameId)

        return room
    }

    updateRoomById(id: RoomId, args: Omit<RoomModel, 'id'>) {
        this.repository.update({ where: { id }, data: { ...args } })
    }

    getRoomById(id: RoomId) {
        return this.repository.findFirst({ where: { id } })
    }

    getRoomsByd(ids: RoomId[]) {
        return this.repository.findManyOR({ where: ids.map(id => ({ id })) })
    }

    getRoomByIdGame(gameId: GameId) {
        return this.repository.findFirst({ where: { gameId } })
    }

    private get repository() {
        return RoomController.repository
    }
}
