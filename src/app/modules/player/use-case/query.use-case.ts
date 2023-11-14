import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { removeAttributesOfObject } from '@util'
import { Service, ServiceContext } from '@common/module/decorator'
import { Player, PlayerInfoPublic, PlayerWithoutPassword } from '@modules/player/player.model'
import { PlayerFindUseCase } from '@modules/player/use-case/find.use-case'
import { RoomFindUseCase } from '@modules/room/use-case/find.use-case'
import { GameFindUseCase } from '@modules/game/use-case/find.use-case'

@Service({ name: 'player.use-case.query', context: ServiceContext.USE_CASE })
export class PlayerQueryUseCase {
    constructor(
        @Injection.Inject('player.use-case.find') private findUC: PlayerFindUseCase,
        @Injection.Inject('room.use-case.find') private roomFindUC: RoomFindUseCase,
        @Injection.Inject('game.use-case.find') private gameFindUC: GameFindUseCase
    ) {}

    querySimpleById(data: { id: ID }) {
        const playerResult = this.queryById({ id: data.id })

        if (!playerResult.isSuccess()) {
            return Result.failure<PlayerInfoPublic>(playerResult.getError())
        }

        return Result.success<PlayerInfoPublic>(this.removeAttributesPrivatePlayer(playerResult.getValue()))
    }

    queryWithoutPasswordById(data: { id: ID }) {
        const playerResult = this.queryById({ id: data.id })

        if (!playerResult.isSuccess()) {
            return Result.failure<PlayerWithoutPassword>(playerResult.getError())
        }

        return Result.success<PlayerWithoutPassword>(this.removeAttributePasswordPlayer(playerResult.getValue()))
    }

    queryById(data: { id: ID }) {
        const playerResult = this.findUC.findById({ id: data.id })

        if (!playerResult.isSuccess()) {
            return Result.failure<Player>(playerResult.getError())
        }

        return Result.success<Player>(playerResult.getValue())
    }

    queryByLogin(data: { login: string }) {
        const playerResult = this.findUC.findByLogin({ login: data.login })

        if (!playerResult.isSuccess()) {
            return Result.failure<Player>(playerResult.getError())
        }

        return Result.success<Player>(playerResult.getValue())
    }

    queryManyByGameId(data: { gameId: ID }) {
        const gameResult = this.gameFindUC.findById({ id: data.gameId })

        if (!gameResult.isSuccess()) {
            return Result.failure<Player>(gameResult.getError())
        }

        return this.findManyByGameId({ gameId: data.gameId })
    }

    private findManyByGameId(data: { gameId: ID }) {
        const roomResult = this.roomFindUC.findByGameId({ gameId: data.gameId })

        if (!roomResult.isSuccess()) {
            return Result.failure<Player>(roomResult.getError())
        }

        return this.findManyByRoomId({ roomId: roomResult.getValue().id })
    }

    queryManyByRoomId(data: { roomId: ID }) {
        const roomResult = this.roomFindUC.findById({ id: data.roomId })

        if (!roomResult.isSuccess()) {
            return Result.failure<Player[]>(roomResult.getError())
        }

        return this.findManyByRoomId({ roomId: data.roomId })
    }

    private findManyByRoomId(data: { roomId: ID }) {
        return this.findUC.findManyByRoomId({ roomId: data.roomId })
    }

    private removeAttributePasswordPlayer(player: Partial<Player>) {
        return removeAttributesOfObject({ ...player }, 'password') as PlayerWithoutPassword
    }

    private removeAttributesPrivatePlayer(player: Partial<Player>) {
        return removeAttributesOfObject(
            { ...player },
            'password',
            'blindType',
            'isDealer',
            'isCurrentBidding',
            'isDealer',
            'order',
            'status',
            'roomId'
        ) as PlayerInfoPublic
    }
}
