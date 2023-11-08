import { Module } from '@common/module/decorator'
import { AppModule } from '@app/app.module'
import { JWTService } from '@services/jwt.service'

@Module({
    imports: [AppModule],
    providers: [
        JWTService,
        { whenCall: 'jwt', use: 'global.service.jwt' }
    ]
})
export class MainModule { }
