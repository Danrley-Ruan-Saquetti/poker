import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { Emitter } from '@services/observer.service'
import { GameType } from '@modules/game/game.model'
import { GameRepository } from '@modules/game/game.repository'
import { ID } from '@@types'

@Service({ name: 'game.use-case.create', context: 'Use Case' })
export class GameStartGameUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('observer.emitter') private emitter: Emitter,
    ) { }

    perform(data: { gameId: ID }) {
        this.gameRepository.update({ where: { id: { equals: data.gameId } }, data: { isRunning: true } })

        return Result.success({ ok: true })
    }
}
