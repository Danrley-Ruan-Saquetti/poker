import { Injection } from '@esliph/injection';
import { Result } from '@esliph/common';
import { Service } from '@common/module/decorator'
import { PlayerRepository } from '@modules/player/player.repository';
import { JWTService } from '@services/jwt.service'
import { EXPIRE_TOKEN_JWT, KEY_SECRET_SERVER } from '@constants';

@Service({ name: 'auth.service' })
export class AuthService {
    constructor(
        @Injection.Inject('player.repository') private playerRepository: PlayerRepository,
        @Injection.Inject('jwt') private jwtService: JWTService
    ) {}

    login(data: { login: string, password: string }) {
        const player = this.playerRepository.findFirst({ where: { login: { equals: data.login } } })

        if (!player || player.password != data.password) {
            return Result.failure<{ token: string }>({ title: 'Authentication Player', message: 'Email or passowrd invalid' })
        }

        const token = this.jwtService.encode({
            sub: player.id
        }, {exp: EXPIRE_TOKEN_JWT, secret: KEY_SECRET_SERVER})

        return Result.success({ token })
    }
}
