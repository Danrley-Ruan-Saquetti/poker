import { Module } from '@common/module/decorator'
import { CardModule } from '@modules/card/card.module'
import { RoomModule } from '@modules/room/room.module'
import { PlayerModule } from '@modules/player/player.module'
import { DeckModule } from '@modules/deck/deck.module'
import { GameModule } from '@modules/game/game.module'
import { AuthModule } from '@modules/auth/auth.module'
import { GameModeModule } from '@modules/game-mode/game-mode.module'

@Module({
    imports: [CardModule, DeckModule, RoomModule, PlayerModule, GameModule, GameModeModule, AuthModule]
})
export class AppModule { }
