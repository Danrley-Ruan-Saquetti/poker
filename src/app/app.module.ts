import { Module } from '@common/module/decorator'
import { CardModule } from '@modules/card/card.module'
import { RoomModule } from '@modules/room/room.module'
import { PlayerModule } from '@modules/player/player.module'

@Module({
    imports: [CardModule, RoomModule, PlayerModule]
})
export class AppModule {}
