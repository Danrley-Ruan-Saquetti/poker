import { Module } from '@common/module/decorator'
import { RoomUseCaseModule } from '@modules/room/use-case/use-case.module'
import { RoomController } from '@modules/room/room.controller'
import { RoomRepository } from '@modules/room/room.repository'

@Module({
    imports: [RoomUseCaseModule],
    controllers: [RoomController],
    providers: [RoomRepository]
})
export class RoomModule { }
