import { Module } from '@common/module/decorator'
import { PlayerUseCaseModule } from '@modules/player/use-case/use-case.module'
import { PlayerController } from '@modules/player/player.controller'
import { PlayerRepository } from '@modules/player/player.repository'

@Module({
    imports: [PlayerUseCaseModule],
    controllers: [PlayerController],
    providers: [PlayerRepository]
})
export class PlayerModule { }
