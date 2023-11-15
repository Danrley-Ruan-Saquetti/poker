import { Construtor } from '@@types'
import { Application } from '@core/app'

export function Bootstrap(appModule: Construtor, options: { port: number, serverLocal?: boolean, logLoad?: boolean, logEventHttp?: boolean, logEventListener?: boolean, logError?: boolean }) {
    Application.fabric(appModule, { serverLocal: options.serverLocal, log: { load: options.logLoad, eventHttp: options.logEventHttp, eventListener: options.logEventListener, logError: options.logError } })
    Application.listen(options.port)

    return Application
}
