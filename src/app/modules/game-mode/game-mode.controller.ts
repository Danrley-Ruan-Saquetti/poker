import { Injection } from '@esliph/injection'
import { ID } from '@@types'
import { Emitter } from '@services/observer.service'
import { Controller } from '@common/module/decorator'
import { OnEvent } from '@common/event/decorator'
import { GameRepository } from '@modules/game/game.repository'
import { GameQueryUseCase } from '@modules/game/use-case/query.use-case'
import { DeckCreateUseCase } from '@modules/deck/use-case/create.use-case'

@Controller()
export class GameModeController {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('game.use-case.query') private gameQueryUC: GameQueryUseCase,
        @Injection.Inject('deck.use-case.create') private deckCreateUC: DeckCreateUseCase,
        @Injection.Inject('observer.emitter') private emitter: Emitter
    ) { }

    @OnEvent('game.start')
    startGame(data: { gameId: ID }) {
        this.gameRepository.update({ where: { id: { equals: data.gameId } }, data: { isRunning: true } })

        this.emitter.emit('game.deck.create', data)
    }

    @OnEvent('game.deck.create')
    prepareDeck(data: { gameId: ID }) {
        this.deckCreateUC.perform({ gameId: data.gameId })
    }

    getOrderEmpty(data: { gameId: ID }) { }
}
