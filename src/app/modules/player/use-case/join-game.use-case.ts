import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Emitter } from '@services/observer.service'
import { Service, ServiceContext } from '@common/module/decorator'
import { PlayerStatus } from '@modules/player/player.model'
import { PlayerRepository } from '@modules/player/player.repository'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'
import { PlayerInGameUseCase } from '@modules/player/use-case/in-game.use-case'
import { GameRepository } from '@modules/game/game.repository'

@Service({ name: 'player.use-case.join-game', context: ServiceContext.USE_CASE })
export class PlayerJoinGameUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('player.use-case.in-game') private playerInGameUC: PlayerInGameUseCase,
        @Injection.Inject('player.use-case.query') private playerQueryUC: PlayerQueryUseCase,
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('observer.emitter') private emitter: Emitter
    ) {}

    perform(data: { playerId: ID; roomId: ID }) {
        if (!this.gameRepository.isExists({ where: { id: { equals: data.roomId } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Game not found' })
        }

        const playersRoomResult = this.playerQueryUC.queryManyByRoomId({ roomId: data.roomId })

        const resultPlayerAlreadyInGame = this.playerInGameUC.varifyPlayerInGame({ playerId: data.playerId })

        if (!resultPlayerAlreadyInGame.isSuccess()) {
            return Result.inherit<{ ok: boolean }>(resultPlayerAlreadyInGame.getResponse() as any)
        }

        if (resultPlayerAlreadyInGame.getValue().inGame) {
            return Result.failure<{ ok: boolean }>({ title: 'Join Game', message: 'Cannot join game because player already in game' })
        }

        this.playerRepository.update({ where: { id: { equals: data.playerId } }, data: { roomId: data.roomId, status: PlayerStatus.WAITING } })

        if (playersRoomResult.getValue().length == 2) {
            const roomResult = this.roomQueryUC.queryById({ id: data.roomId })

            if (roomResult.isSuccess()) {
                this.emitter.emit('game.start', { gameId: roomResult.getValue().gameId })
            }
        }

        return Result.success({ ok: true })
    }

    private performJoinGame(data: { playerId: ID; roomId: ID }) {
        const playersRoomResult = this.playerQueryUC.queryManyByRoomId({ roomId: data.roomId })

        const resultPlayerAlreadyInGame = this.playerInGameUC.varifyPlayerInGame({ playerId: data.playerId })

        if (!resultPlayerAlreadyInGame.isSuccess()) {
            return Result.inherit<{ ok: boolean }>(resultPlayerAlreadyInGame.getResponse() as any)
        }

        if (resultPlayerAlreadyInGame.getValue().inGame) {
            return Result.failure<{ ok: boolean }>({ title: 'Join Game', message: 'Cannot join game because player already in game' })
        }

        this.playerRepository.update({ where: { id: { equals: data.playerId } }, data: { roomId: data.roomId, status: PlayerStatus.WAITING } })

        if (playersRoomResult.getValue().length == 2) {
            const roomResult = this.roomQueryUC.queryById({ id: data.roomId })

            if (roomResult.isSuccess()) {
                this.emitter.emit('game.start', { gameId: roomResult.getValue().gameId })
            }
        }

        return Result.success({ ok: true })
    }
}
