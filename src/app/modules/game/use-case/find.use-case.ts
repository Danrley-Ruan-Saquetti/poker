import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'
import { Game, GameType } from '@modules/game/game.model'

@Service({ name: 'game.use-case.find', context: ServiceContext.USE_CASE })
export class GameFindUseCase {
    constructor(@Injection.Inject('game.repository') private repository: GameRepository) {}

    findById(data: { id: ID }) {
        const game = this.repository.findFirst({ where: { id: { equals: data.id } } })

        if (!game) {
            return Result.failure<Game>({ title: 'Find Game', message: 'Game not Found' })
        }

        return Result.success<Game>(game)
    }

    findByIdAndIsRunning(data: { id: ID }) {
        const game = this.repository.findFirst({ where: { id: { equals: data.id }, isRunning: { equals: true } } })

        if (!game) {
            return Result.failure<Game>({ title: 'Find Game', message: 'Game not Found' })
        }

        return Result.success<Game>(game)
    }

    findManyByType(data: { type: GameType }) {
        return Result.success<Game[]>(this.repository.findMany({ where: { type: { equals: data.type } } }))
    }
}
