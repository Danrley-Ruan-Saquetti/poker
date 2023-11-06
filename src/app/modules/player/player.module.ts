import { Module } from '@common/module/decorator'
import { PlayerController } from '@modules/player/player.controller'
import { PlayerService } from '@modules/player/player.service'

@Module({
    controllers: [PlayerController],
    imports: [],
    provider: [PlayerService]
})
export class PlayerModule {}
