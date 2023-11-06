import { Construtor } from '@@types/index'
import { Application } from '@core/app'

export function Bootstrap(appModule: Construtor, listenConfig: {active?: boolean, port: number}) {
    Application.fabric(appModule)

    if (listenConfig.active) {
        Application.listen(listenConfig.port)
    }
}
