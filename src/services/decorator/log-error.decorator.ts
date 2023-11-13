import { Application } from '@core/app'
import { Result } from '@esliph/common'
import { Decorator } from '@esliph/decorator'

export function LogError() {
    function handler(target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = (...args: any[]) => {
            const result = originalMethod(...args)

            if (result instanceof Result) {
                Application.logger.error(result.getError().title + ' - ' + result.getError().message, null, { context: 'RESULT' })
            }

            return result
        }
    }

    return Decorator.Create.Method(handler)
}
