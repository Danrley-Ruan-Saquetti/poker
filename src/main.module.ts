import { Module } from '@common/module/decorator'
import { AppModule } from '@app/app.module'
import { JWTService } from '@services/jwt.service'
import { Emitter, Listener } from '@services/observer.service'
import { Logger } from '@services/logger.service'

@Module({
    imports: [AppModule],
    providers: [
        JWTService,
        { whenCall: 'jwt', use: 'global.service.jwt' },
        Emitter,
        Listener,
        Logger
    ]
})
export class MainModule { }
