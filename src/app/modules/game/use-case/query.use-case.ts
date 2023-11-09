import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'

@Service({ name: 'game.use-case.query', context: 'Use Case' })
export class GameQueryUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
    ) { }
}
