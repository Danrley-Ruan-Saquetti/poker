import { AppModule } from '@app/app.module'
import { Bootstrap } from '@core/bootstrap'

Bootstrap(AppModule, { active: false, port: 8080 })
