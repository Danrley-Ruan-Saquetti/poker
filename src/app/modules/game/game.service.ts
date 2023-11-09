import { ID } from '@@types/index'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Emitter } from '@services/observer.service'
import { Service } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'
import { PlayerService } from '@modules/player/player.service'
import { GameType } from '@modules/game/game.model'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'

@Service({ name: 'game.service' })
export class GameService {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.service') private playerService: PlayerService,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('observer.emitter') private emitter: Emitter,
    ) { }

    create(data: { playerId: number, type: GameType }) {
        const game = this.gameRepository.create({ data: { isRunning: false, type: data.type } })

        this.emitter.emit('game.create', { ...data, gameId: game.id })

        return Result.success({ id: game.id })
    }

    joinGame(data: { playerId: ID, roomId: ID }) {
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

    getPlayersByGameId(data: { gameId: ID }) {
        const resultRoom = this.roomQueryUC.getRoomByGameId({ gameId: data.gameId })

        if (!resultRoom.isSuccess()) {
            return Result.failure({ title: 'Find Players in Game', message: 'Cannot found room' })
        }

        return Result.success(this.playerService.findManyByRoomId({ roomId: resultRoom.getValue().id }))
    }
}
