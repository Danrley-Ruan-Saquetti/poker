import { ModelSchema } from '@esliph/repository-memory'
import { Service } from '@common/module/decorator'
import { GameModel } from '@modules/game/game.model'

@Service({ name: 'game.repository', context: 'Repository' })
export class GameRepository extends ModelSchema<GameModel> {
    constructor() {
        super('Game')
    }
}
