import { Construtor } from '@@types/index'
import { Application } from '@core/app'

export function Bootstrap(appModule: Construtor) {
    Application.fabric(appModule)
}
