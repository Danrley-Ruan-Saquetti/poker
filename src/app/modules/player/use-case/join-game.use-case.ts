import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service } from '@common/module/decorator'
import { PlayerRepository } from '@modules/player/player.repository'

@Service({ name: 'player.use-case.join-game', context: 'Use Case' })
export class PlayerJoinGameUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
    ) { }

    perform(data: { playerId: ID, roomId: ID }) {
        this.playerRepository.update({ where: { id: { equals: data.playerId } }, data: { roomId: data.roomId } })

        return Result.success({ ok: true })
    }
}
