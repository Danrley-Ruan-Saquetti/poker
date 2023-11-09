import { Module } from '@common/module/decorator'
import { AuthorizationFilter } from '@modules/auth/filters/authorization.filter'
import { AuthUseCaseModule } from '@modules/auth/use-case/use-case.module'
import { AuthService } from '@modules/auth/auth.service'
import { AuthController } from '@modules/auth/auth.controller'

@Module({
    imports: [AuthUseCaseModule],
    controllers: [AuthController],
    providers: [
        AuthorizationFilter, { whenCall: 'authorization', use: 'authorization.filter' }, AuthService, { whenCall: 'auth.service', use: 'auth.service' }
    ]
})
export class AuthModule { }
