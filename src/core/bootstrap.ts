import { Construtor } from '@@types/index'
import { Application } from '@core/app'

export function Bootstrap(appModule: Construtor, options: { port: number, serverLocal?: boolean, logLoad?: boolean }) {
    Application.fabric(appModule, { serverLocal: options.serverLocal, log: { load: options.logLoad } })
    Application.listen(options.port)
}
