import { RoomRepository } from '@modules/room/room.repository'
import { Controller } from '@common/module/decorator'
import { Injection } from '@esliph/injection'

@Controller()
export class RoomController {
    constructor(
        @Injection.Inject('room.repository') private roomRepository: RoomRepository
    ) { }
}
