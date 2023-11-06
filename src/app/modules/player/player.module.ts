import { Module } from '@common/module'
import { PlayerController } from '@modules/player/player.controller'
import { PlayerService } from '@modules/player/player.serivce'

@Module({
    controllers: [PlayerController],
    imports: [],
    provider: [PlayerService]
})
export class PlayerModule {}
