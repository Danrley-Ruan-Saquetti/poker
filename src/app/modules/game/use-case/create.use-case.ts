import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { Emitter } from '@services/observer.service'
import { GameType } from '@modules/game/game.model'
import { GameRepository } from '@modules/game/game.repository'
import { RoomCreateUseCase } from '@modules/room/use-case/create.use-case'
import { PlayerJoinGameUseCase } from '../../player/use-case/join-game.use-case'

@Service({ name: 'game.use-case.create', context: 'Use Case' })
export class GameCreateUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('observer.emitter') private emitter: Emitter,
        @Injection.Inject('room.use-case.create') private roomCreateUC: RoomCreateUseCase,
        @Injection.Inject('player.use-case.join-game') private playerJoinGameUC: PlayerJoinGameUseCase,
    ) { }

    perform(data: { playerId: number, type: GameType }) {
        const game = this.gameRepository.create({ data: { isRunning: false, type: data.type } })
        const room = this.roomCreateUC.perform({ gameId: game.id })

        this.playerJoinGameUC.perform({ playerId: data.playerId, roomId: room.getValue().id })

        return Result.success({ ok: true })
    }
}
