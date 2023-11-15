import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service, ServiceContext } from '@common/module/decorator'
import { KEY_SECRET_SERVER } from '@constants'
import { JWTService } from '@services/jwt.service'
import { PayloadJWT } from '@@types'

@Service({ name: 'auth.use-case.authorization', context: ServiceContext.USE_CASE })
export class AuthAuthorizationUseCase {
    constructor(@Injection.Inject('jwt') private jwtService: JWTService) {}

    perform(Authorization: string) {
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
