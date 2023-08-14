import { RoomId } from '../room/room.entity'
import { PlayerEntity, PlayerId, PlayerModel } from './player.entity'
import { PlayerRepository } from './player.repository'

export class PlayerController {
    private static repository = new PlayerRepository()

    createPlayer({ money, name, room }: Omit<PlayerModel, 'id' | 'cards'>) {
        const playerDoc = PlayerController.repository.add({ money, name, room, cards: [] })

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

    getPlayersByIdRoom(roomId: RoomId) {
        return PlayerController.repository.findMany({ room: { id: roomId } })
    }
}
