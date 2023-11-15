import { Injection } from '@esliph/injection'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { GameFindUseCase } from '@modules/game/use-case/find.use-case'

@Service({ name: 'game.use-case.query', context: ServiceContext.USE_CASE })
export class GameQueryUseCase {
    constructor(
        @Injection.Inject('game.use-case.find') private findUC: GameFindUseCase,
    ) { }

    queryById(data: { id: ID }) {
        return this.findUC.findById(data)
    }
}
