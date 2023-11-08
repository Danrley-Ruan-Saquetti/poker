import { Module } from '@common/module/decorator'
import { AuthService } from '@modules/auth/auth.service'
import { AuthController } from '@modules/auth/auth.controller'
import { AuthorizationFilter } from '@modules/auth/filters/authorization.filter'

@Module({
    controllers: [AuthController],
    provider: [
        AuthorizationFilter, { whenCall: 'authorization', use: 'authorization.filter' }, AuthService, { whenCall: 'auth.service', use: 'auth.service' }
    ]
})
export class AuthModule { }
