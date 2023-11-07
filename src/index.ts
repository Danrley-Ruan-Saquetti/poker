import { Bootstrap } from '@core/bootstrap'
import { MainModule } from './main.module'

Bootstrap(MainModule, { active: false, port: 8080 })