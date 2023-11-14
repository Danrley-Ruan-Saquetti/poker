import { ModelSchema } from '@esliph/repository-memory'
import { Service, ServiceContext } from '@common/module/decorator'
import { PlayerModel } from '@modules/player/player.model'

@Service({ name: 'player.repository', context: ServiceContext.REPOSITORY })
export class PlayerRepository extends ModelSchema<PlayerModel> {
    constructor() {
        super('Player')
    }
}
