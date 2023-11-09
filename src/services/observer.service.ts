import { ObserverEmitter, ObserverListener } from '@esliph/observer'
import { Service } from '@common/module/decorator'

@Service({ name: 'observer.emitter', context: 'Service' })
export class Emitter extends ObserverEmitter {
    constructor() {
        super({})
    }
}

@Service({ name: 'observer.listener', context: 'Service' })
export class Listener extends ObserverListener {
    constructor() {
        super({})
    }
}
