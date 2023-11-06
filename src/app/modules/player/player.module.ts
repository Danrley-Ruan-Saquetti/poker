import { Module } from '@common/decorator'
import { PlayerController } from '@modules/player/player.controller'
import { PlayerService } from '@modules/player/player.service'

@Module({
    controllers: [PlayerController],
    imports: [],
    provider: [PlayerService]
})
export class PlayerModule {}
