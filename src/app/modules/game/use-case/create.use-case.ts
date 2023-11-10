import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { GameType } from '@modules/game/game.model'
import { GameRepository } from '@modules/game/game.repository'
import { RoomCreateUseCase } from '@modules/room/use-case/create.use-case'
import { PlayerJoinGameUseCase } from '@modules/player/use-case/join-game.use-case'
import { PlayerInGameUseCase } from '@modules/player/use-case/in-game.use-case'

@Service({ name: 'game.use-case.create', context: 'Use Case' })
export class GameCreateUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.use-case.in-game') private playerInGameUC: PlayerInGameUseCase,
        @Injection.Inject('room.use-case.create') private roomCreateUC: RoomCreateUseCase,
        @Injection.Inject('player.use-case.join-game') private playerJoinGameUC: PlayerJoinGameUseCase,
    ) { }

    perform(data: { playerId: number, type: GameType }) {
        const playerInGameResult = this.playerInGameUC.perform({ playerId: data.playerId })

        if (!playerInGameResult.isSuccess()) {
            return Result.inherit<{ ok: boolean }>(playerInGameResult as any)
        }

        if (playerInGameResult.getValue().inGame) {
            return Result.failure({ title: 'Create Game', message: 'Cannot create game because player already in game' })
        }

        const game = this.gameRepository.create({ data: { isRunning: false, type: data.type } })
        const room = this.roomCreateUC.perform({ gameId: game.id })

        this.playerJoinGameUC.perform({ playerId: data.playerId, roomId: room.getValue().id })

        return Result.success<{ ok: boolean }>({ ok: true })
    }
}
