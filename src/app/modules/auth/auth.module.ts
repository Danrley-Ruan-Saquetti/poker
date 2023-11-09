import { Module } from '@common/module/decorator'
import { AuthorizationFilter } from '@modules/auth/filters/authorization.filter'
import { AuthUseCaseModule } from '@modules/auth/use-case/use-case.module'
import { AuthController } from '@modules/auth/auth.controller'

@Module({
    imports: [AuthUseCaseModule],
    controllers: [AuthController],
    providers: [
        AuthorizationFilter, { whenCall: 'authorization', use: 'authorization.filter' }
    ]
})
export class AuthModule { }
