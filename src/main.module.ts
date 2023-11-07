import { Module } from '@common/module/decorator'
import { AppModule } from '@app/app.module'
import { JWTService } from '@services/jwt.service'

@Module({
    imports: [AppModule],
    provider: [JWTService]
})
export class MainModule {}
