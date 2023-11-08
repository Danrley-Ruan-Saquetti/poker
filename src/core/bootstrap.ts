import { Construtor } from '@@types/index'
import { Application } from '@core/app'

export function Bootstrap(appModule: Construtor, listenConfig: { port: number, serverLocal?: boolean }) {
    Application.fabric(appModule, { serverLocal: listenConfig.serverLocal })
    Application.listen(listenConfig.port)
}
