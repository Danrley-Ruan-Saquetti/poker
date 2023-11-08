import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { Service } from '@common/module/decorator'
import { PlayerRepository } from '@modules/player/player.repository'
import { JWTService } from '@services/jwt.service'
import { PayloadJWT } from '@@types/index'
import { EXPIRE_TOKEN_JWT, KEY_SECRET_SERVER } from '@constants'

@Service({ name: 'auth.service' })
export class AuthService {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('jwt') private jwtService: JWTService
    ) { }

    login(data: { login: string, password: string }) {
        const player = this.playerRepository.findFirst({ where: { login: { equals: data.login } } })

        if (!player || player.password != data.password) {
            return Result.failure<{ token: string }>({ title: 'Authentication Player', message: 'Email or passowrd invalid' })
        }

        const token = this.jwtService.encode({
            sub: player.id
        }, { exp: EXPIRE_TOKEN_JWT, secret: KEY_SECRET_SERVER })

        return Result.success({ token })
    }

    authorization(Authorization: string) {
        if (!Authorization) {
            throw Result.failure<PayloadJWT>({ title: 'Authorization Player', message: 'Token for authorization not defined' })
        }

        if (Authorization.split(' ').length != 2) {
            throw Result.failure<PayloadJWT>({ title: 'Authorization Player', message: 'Invalid authorization token' })
        }

        const [bearer, token] = Authorization.split(' ')

        if (bearer !== 'Bearer') {
            throw Result.failure<PayloadJWT>({ title: 'Authorization Player', message: 'Invalid authorization token' })
        }

        try {
            const payload = this.jwtService.decode(token, KEY_SECRET_SERVER)

            return Result.success<PayloadJWT>(payload)
        } catch (err: any) {
            throw Result.failure<PayloadJWT>({ title: 'Authorization Player', message: 'Invalid authorization token' })
        }
    }
}
