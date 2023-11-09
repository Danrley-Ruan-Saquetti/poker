import { PlayerJoinGameUseCase } from '@modules/player/use-case/join-game.use-case'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'
import { GameRepository } from '@modules/game/game.repository'
import { PlayerInGameUseCase } from '@modules/player/use-case/in-game.use-case'

@Service({ name: 'game.use-case.join-game', context: 'Use Case' })
export class GameJoinGameUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.use-case.in-game') private playerInGameUC: PlayerInGameUseCase,
        @Injection.Inject('player.use-case.join-game') private playerJoinGameUC: PlayerJoinGameUseCase,
    ) { }

    perform(data: { playerId: ID, roomId: ID }) {
        if (!this.gameRepository.isExists({ where: { id: { equals: data.roomId } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Game not found' })
        }

        const resultPlayerAlreadyInGame = this.playerInGameUC.perform({ playerId: data.playerId })

        if (!resultPlayerAlreadyInGame.isSuccess()) {
            return Result.inherit<{ ok: boolean }>(resultPlayerAlreadyInGame.getResponse() as any)
        }

        if (resultPlayerAlreadyInGame.getValue().inGame) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Player already in game' })
        }

        this.playerJoinGameUC.perform({ playerId: data.playerId, roomId: data.roomId })

        return Result.success<{ ok: boolean }>({ ok: true })
    }
}
