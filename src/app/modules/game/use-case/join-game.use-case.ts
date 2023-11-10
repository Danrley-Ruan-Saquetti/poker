import { PlayerJoinGameUseCase } from '@modules/player/use-case/join-game.use-case'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { ID } from '@@types'

@Service({ name: 'game.use-case.join-game', context: 'Use Case' })
export class GameJoinGameUseCase {
    constructor(
        @Injection.Inject('player.use-case.join-game') private playerJoinGameUC: PlayerJoinGameUseCase,
    ) { }

    perform(data: { playerId: ID, roomId: ID }) {
        return this.playerJoinGameUC.perform({ playerId: data.playerId, roomId: data.roomId })
    }
}
