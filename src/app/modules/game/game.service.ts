import { ID } from '@@types/index'
import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'
import { PlayerService } from '@modules/player/player.service'
import { RoomService } from '@modules/room/room.service'

@Service({ name: 'game.service' })
export class GameService {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.service') private playerService: PlayerService,
        @Injection.Inject('room.service') private roomService: RoomService,
    ) { }

    create(data: { playerId: number }) {
        const game = this.gameRepository.create({ data: { isRunning: false } })
        const room = this.roomService.create({ gameId: game.id })

        this.playerService.joinGame({ playerId: data.playerId, roomId: room.getValue().id })

        return Result.success({ id: game.id })
    }

    joinGame(data: { playerId: ID, roomId: ID }) {
        if (!this.gameRepository.isExists({ where: { id: { equals: data.roomId } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Game not found' })
        }

        const resultPlayerAlreadyInGame = this.playerService.isInGame({ playerId: data.playerId })

        if (!resultPlayerAlreadyInGame.isSuccess()) {
            return Result.inherit(resultPlayerAlreadyInGame.getResponse())
        }

        if (resultPlayerAlreadyInGame.getValue().inGame) {
            return Result.failure<{ ok: boolean }>({ title: 'Joint Game', message: 'Player already in game' })
        }

        this.playerService.joinGame({ playerId: data.playerId, roomId: data.roomId })

        return Result.success<{ ok: boolean }>({ ok: true })
    }

    getPlayersByGameId(data: { gameId: ID }) {
        const resultRoom = this.roomService.getRoomByGameId({ gameId: data.gameId })

        if (!resultRoom.isSuccess()) {
            return Result.failure({ title: 'Find Players in Game', message: 'Cannot found room' })
        }

        return Result.success(this.playerService.findManyByRoomId({ roomId: resultRoom.getValue().id }))
    }
}
