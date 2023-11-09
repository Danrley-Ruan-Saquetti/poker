import { Request, Response } from '@esliph/http'
import { Injection } from '@esliph/injection'
import { Filter, FilterPerform } from '@common/module/decorator'
import { AuthAuthorizationUseCase } from '@modules/auth/use-case/authorization.use-case'

@Filter({ name: 'authorization.filter' })
export class AuthorizationFilter implements FilterPerform {
    constructor(@Injection.Inject('auth.use-case.authorization') private authorizationUC: AuthAuthorizationUseCase) { }

    async perform(req: Request<any>, res: Response<any>) {
        const response = this.authorizationUC.perform(req.headers.Authorization || '')

        if (response.isSuccess()) {
            req.headers['playerId'] = response.getValue().sub
        } else {
            return response
        }
    }
}
