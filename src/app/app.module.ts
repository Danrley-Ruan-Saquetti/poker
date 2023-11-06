import { Module } from '@common/module'
import { PlayerModule } from '@modules/player/player.module'

@Module({
    imports: [PlayerModule]
})
export class AppModule {}
