import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'

@Service({ name: 'player.use-case.in-game', context: ServiceContext.USE_CASE })
export class PlayerInGameUseCase {
    constructor(@Injection.Inject('player.use-case.query') private playerQueryUC: PlayerQueryUseCase) {}

    varifyPlayerInGame(data: { playerId: ID }) {
        const resultPlayer = this.playerQueryUC.findById({ id: data.playerId })

        if (!resultPlayer.isSuccess()) {
            return Result.inherit<{ inGame: boolean }>(resultPlayer.getResponse() as any)
        }

        return Result.success<{ inGame: boolean }>({ inGame: !!resultPlayer.getValue().roomId })
    }
}
