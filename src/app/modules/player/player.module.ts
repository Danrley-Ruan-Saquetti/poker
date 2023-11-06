import { Module } from '@common/module'
import { PlayerController } from '@modules/player/player.controller'

@Module({
    controllers: [PlayerController]
})
export class PlayerModule {}
