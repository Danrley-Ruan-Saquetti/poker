import { PartialDeep } from 'src/util'
import { RoomId } from '../room/room.entity'
import { PlayerEntity, PlayerId, PlayerModel } from './player.entity'
import { PlayerRepository } from './player.repository'

export class PlayerController {
    private static repository = new PlayerRepository()

    createPlayer({ money, name, room }: Omit<PlayerModel, 'id' | 'cards' | 'active' | 'isDealer' | 'inGame'>) {
        const playerDoc = this.repository.create({ money, name, room, cards: [], active: false, isDealer: false, inGame: true })

        const player = new PlayerEntity(playerDoc)

        return player
    }

    updatePlayerById(id: PlayerId, args: PartialDeep<Omit<PlayerModel, 'id'>>) {
        this.repository.updateById(id, args)
    }

    removePlayerBy(id: PlayerId) {
        this.repository.removeById(id)
    }

    getPlayerById(id: PlayerId) {
        return this.repository.findById(id)
    }

    getPlayersById(ids: PlayerId[]) {
        return this.repository.findManyWithOr(ids.map(id => ({ id })))
    }

    query(argsOr: PartialDeep<PlayerModel>) {
        return this.repository.findFirst(argsOr)
    }

    getPlayersByIdRoom(roomId: RoomId) {
        return this.repository.findMany({ room: { id: roomId } })
    }

    private get repository() {
        return PlayerController.repository
    }
}
