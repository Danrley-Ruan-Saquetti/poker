import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'

@Service({ name: 'game.use-case.query', context: 'Use Case' })
export class GameQueryUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
    ) { }

    getState(data: { gameId: ID }) {
        const game = this.gameRepository.findFirst({ where: { id: { equals: data.gameId } } })

        if (!game) {
            return Result.failure({title: 'Get State in Game', message: ''})
        }

        return Result.success()
    }
}
