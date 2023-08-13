import { RoomController } from './room/room.controller'

export class AppController {
    private roomController: RoomController

    constructor() {
        this.roomController = new RoomController()
    }
}
