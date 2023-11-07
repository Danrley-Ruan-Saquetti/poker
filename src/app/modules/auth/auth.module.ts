import { Module } from '@common/module/decorator'
import { AuthService } from '@modules/auth/auth.service'
import { AuthController } from '@modules/auth/auth.controller'

@Module({
    controllers: [AuthController],
    provider: [AuthService, {whenCall: 'auth.service', use: 'auth.service'}]
})
export class AuthModule {}
