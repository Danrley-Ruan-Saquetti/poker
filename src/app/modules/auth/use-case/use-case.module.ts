import { Module } from '@common/module/decorator'
import { AuthLoginUseCase } from '@modules/auth/use-case/login.use-case'
import { AuthAuthorizationUseCase } from '@modules/auth/use-case/authorization.use-case'

@Module({
    providers: [AuthLoginUseCase, AuthAuthorizationUseCase]
})
export class AuthUseCaseModule { }
