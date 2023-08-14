import { RoomId } from '../room/room.entity'
import { PlayerEntity, PlayerId, PlayerModel } from './player.entity'
import { PlayerRepository } from './player.repository'

export class PlayerController {
    private static repository = new PlayerRepository()

    createPlayer({ money, name, roomId }: Omit<PlayerModel, 'id'>) {
        const playerDoc = PlayerController.repository.add({ money, name, roomId })

        const player = new PlayerEntity(playerDoc)

        return player
    }

    updatePlayerById(args: PlayerModel) {
        PlayerController.repository.updateById(args.id, args)
    }

    removePlayerBy(id: PlayerId) {
        PlayerController.repository.removeById(id)
    }

    getPlayerById(id: PlayerId) {
        return PlayerController.repository.findById(id)
    }

    getPlayersById(ids: PlayerId[]) {
        return PlayerController.repository.findManyWithOr(ids.map(id => ({ id })))
    }

    getPlayerByIdRoom(roomId: RoomId) {
        return PlayerController.repository.findMany({ roomId })
    }
}
