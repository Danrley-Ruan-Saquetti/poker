import { Construtor } from '@@types/index'
import { Application } from '@core/app'

export function Bootstrap(appModule: Construtor, options: { port: number, serverLocal?: boolean, logLoad?: boolean, logEventHttp?: boolean, logEventListener?: boolean, enableInputTerminal?: boolean }) {
    Application.fabric(appModule, { serverLocal: options.serverLocal, log: { load: options.logLoad, eventHttp: options.logEventHttp, eventListener: options.logEventListener }, enableEventTerminal: options.enableInputTerminal })
    Application.listen(options.port)

    return Application
}
