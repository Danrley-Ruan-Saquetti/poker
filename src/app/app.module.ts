import { Module } from '@common/decorator'
import { PlayerModule } from '@modules/player/player.module'
import { UserModule } from '@modules/user/user.module'

@Module({
    imports: [PlayerModule, UserModule]
})
export class AppModule {}
