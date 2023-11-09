import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service } from '@common/module/decorator'
import { EXPIRE_TOKEN_JWT, KEY_SECRET_SERVER } from '@constants'
import { JWTService } from '@services/jwt.service'
import { PlayerRepository } from '@modules/player/player.repository'

@Service({ name: 'auth.use-case.login' })
export class AuthLoginUseCase {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('jwt') private jwtService: JWTService
    ) { }

    perform(data: { login: string, password: string }) {
        const player = this.playerRepository.findFirst({ where: { login: { equals: data.login } } })

        if (!player || player.password != data.password) {
            return Result.failure<{ token: string }>({ title: 'Authentication Player', message: 'Email or password invalid' })
        }

        const token = this.jwtService.encode({ sub: player.id }, { exp: EXPIRE_TOKEN_JWT, secret: KEY_SECRET_SERVER })

        return Result.success({ token })
    }
}
