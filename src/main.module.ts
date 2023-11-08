import { Module } from '@common/module/decorator'
import { AppModule } from '@app/app.module'
import { JWTService } from '@services/jwt.service'
import { Emitter, Listener } from '@services/observers'

@Module({
    imports: [AppModule],
    providers: [
        JWTService,
        { whenCall: 'jwt', use: 'global.service.jwt' },
        Emitter,
        Listener,
    ]
})
export class MainModule { }
