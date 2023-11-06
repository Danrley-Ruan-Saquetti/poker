import { Module } from '@common/decorator'
import { UserController } from '@modules/user/user.controller'
import { UserService } from '@modules/user/user.service'

@Module({
    controllers: [UserController],
    imports: [],
    provider: [UserService]
})
export class UserModule {}
