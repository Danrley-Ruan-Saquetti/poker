import { ModelSchema } from '@esliph/repository-memory'
import { Service } from '@common/module/decorator'
import { RoomModel } from '@modules/room/room.model'

@Service({ name: 'room.repository', context: 'Repository' })
export class RoomRepository extends ModelSchema<RoomModel> {
    constructor() {
        super('Room')
    }
}
