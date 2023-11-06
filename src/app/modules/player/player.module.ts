import { Module } from '@common/module/decorator'
import { PlayerController } from '@modules/player/player.controller'

@Module({
    controllers: [PlayerController],
    imports: [],
    provider: []
})
export class PlayerModule {}
