import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'
import { GameRepository } from '@modules/game/game.repository'
import { PlayerService } from '@modules/player/player.service'

@Service({ name: 'game.use-case.join-game' })
export class GameJoinGameUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.service') private playerService: PlayerService,
    ) { }

    perform(data: { playerId: ID, roomId: ID }) {
        if (!this.gameRepository.isExists({ where: { id: { equals: data.roomId } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Game not found' })
        }

        const resultPlayerAlreadyInGame = this.playerService.isInGame({ playerId: data.playerId })

        if (!resultPlayerAlreadyInGame.isSuccess()) {
            return Result.inherit<{ ok: boolean }>(resultPlayerAlreadyInGame.getResponse() as any)
        }

        if (resultPlayerAlreadyInGame.getValue().inGame) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Player already in game' })
        }

        this.playerService.joinGame({ playerId: data.playerId, roomId: data.roomId })

        return Result.success<{ ok: boolean }>({ ok: true })
    }
}