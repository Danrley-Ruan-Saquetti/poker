import { PartialDeep } from 'src/util'
import { RoomId } from '../room/room.entity'
import { PlayerEntity, PlayerId, PlayerModel } from './player.entity'
import { PlayerRepository } from './player.repository'

export class PlayerController {
    private static repository = new PlayerRepository()

    createPlayer({ money, name, room }: Omit<PlayerModel, 'id' | 'cards' | 'active' | 'isDealer' | 'inGame' | 'isBetting'>) {
        const playerDoc = this.repository.create({ data: { money, name, room, cards: [], active: false, isDealer: false, inGame: true, isBetting: false } })

        const player = new PlayerEntity(playerDoc)

        return player
    }

    updatePlayerById(id: PlayerId, args: PartialDeep<Omit<PlayerModel, 'id'>>) {
        this.repository.update({ where: { id }, data: { ...args } })
    }

    removePlayerBy(id: PlayerId) {
        this.repository.delete({ where: { id } })
    }

    getPlayerById(id: PlayerId) {
        return this.repository.findFirst({ where: { id } })
    }

    getPlayersById(ids: PlayerId[]) {
        return this.repository.findManyOR({ where: ids.map(id => ({ id })) })
    }

    query(argsOr: PartialDeep<PlayerModel>) {
        return this.repository.findFirst({ where: { ...argsOr } })
    }

    getPlayersByIdRoom(roomId: RoomId) {
        return this.repository.findMany({ where: { room: { id: roomId } } })
    }

    private get repository() {
        return PlayerController.repository
    }
}
