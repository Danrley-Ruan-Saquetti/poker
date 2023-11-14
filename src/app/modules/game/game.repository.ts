import { ModelSchema } from '@esliph/repository-memory'
import { Service, ServiceContext } from '@common/module/decorator'
import { GameModel } from '@modules/game/game.model'

@Service({ name: 'game.repository', context: ServiceContext.REPOSITORY })
export class GameRepository extends ModelSchema<GameModel> {
    constructor() {
        super('Game')
    }
}
