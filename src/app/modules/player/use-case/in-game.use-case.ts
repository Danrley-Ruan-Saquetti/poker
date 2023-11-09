import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service } from '@common/module/decorator'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'

@Service({ name: 'player.use-case.in-game', context: 'Use Case' })
export class PlayerInGameUseCase {
    constructor(
        @Injection.Inject('player.sue-case.query') private playerQueryUC: PlayerQueryUseCase,
    ) { }

    perform(data: { playerId: ID }) {
        const resultPlayer = this.playerQueryUC.findById(data)

        if (!resultPlayer.isSuccess()) {
            return Result.inherit<{ inGame: boolean }>(resultPlayer.getResponse() as any)
        }

        return Result.success<{ inGame: boolean }>({ inGame: !!resultPlayer.getValue().roomId })
    }
}
