import { Module } from '@common/module/decorator'
import { RoomController } from '@modules/room/room.controller'
import { RoomRepository } from '@modules/room/room.repository'
import { RoomService } from '@modules/room/room.service'

@Module({
    controllers: [RoomController],
    providers: [RoomRepository, RoomService]
})
export class RoomModule { }
