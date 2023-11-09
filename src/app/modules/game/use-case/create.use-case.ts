import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { Emitter } from '@services/observer.service'
import { GameType } from '@modules/game/game.model'
import { GameRepository } from '@modules/game/game.repository'

@Service({ name: 'game.use-case.create', context: 'Use Case' })
export class GameCreateUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('observer.emitter') private emitter: Emitter,
    ) { }

    perform(data: { playerId: number, type: GameType }) {
        const game = this.gameRepository.create({ data: { isRunning: false, type: data.type } })

        this.emitter.emit('game.create', { ...data, gameId: game.id })

        return Result.success({ id: game.id })
    }
}
