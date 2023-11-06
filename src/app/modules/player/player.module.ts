import { Module } from '@common/module/decorator'
import { PlayerController } from '@modules/player/player.controller'
import { PlayerRepository } from '@modules/player/player.repository'
import { PlayerService } from '@modules/player/player.service'

@Module({
    controllers: [PlayerController],
    provider: [PlayerRepository, PlayerService]
})
export class PlayerModule {}
