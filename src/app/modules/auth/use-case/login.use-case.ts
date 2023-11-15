import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service, ServiceContext } from '@common/module/decorator'
import { EXPIRE_TOKEN_JWT, KEY_SECRET_SERVER } from '@constants'
import { JWTService } from '@services/jwt.service'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'

@Service({ name: 'auth.use-case.login', context: ServiceContext.USE_CASE })
export class AuthLoginUseCase {
    constructor(@Injection.Inject('player.repository') private playerRepository: PlayerQueryUseCase, @Injection.Inject('jwt') private jwtService: JWTService) {}

    perform(data: { login: string; password: string }) {
        const playerResult = this.playerRepository.queryByLogin({ login: data.login })

        if (!playerResult.isSuccess() || playerResult.getValue().password != data.password) {
            return Result.failure<{ token: string }>({ title: 'Authentication Player', message: 'Email or password invalid' })
        }

        const token = this.jwtService.encode({ sub: playerResult.getValue().id }, { exp: EXPIRE_TOKEN_JWT, secret: KEY_SECRET_SERVER })

        return Result.success({ token })
    }
}
