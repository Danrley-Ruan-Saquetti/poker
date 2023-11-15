import { ModelSchema } from '@esliph/repository-memory'
import { Service, ServiceContext } from '@common/module/decorator'
import { RoomModel } from '@modules/room/room.model'

@Service({ name: 'room.repository', context: ServiceContext.REPOSITORY })
export class RoomRepository extends ModelSchema<RoomModel> {
    constructor() {
        super('Room')
    }
}
