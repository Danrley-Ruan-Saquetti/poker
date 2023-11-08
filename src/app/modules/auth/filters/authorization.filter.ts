import { Request, Response } from '@esliph/http'
import { Injection } from '@esliph/injection'
import { Filter, FilterPerform } from '@common/module/decorator'
import { AuthService } from '@modules/auth/auth.service'

@Filter({ name: 'authorization.filter' })
export class AuthorizationFilter implements FilterPerform {
    constructor(@Injection.Inject('auth.service') private authService: AuthService) { }

    async perform(req: Request<any>, res: Response<any>) {
        const response = this.authService.authorization(req.headers.Authorization || '')

        if (response.isSuccess()) {
            req.headers['playerId'] = response.getValue().sub
        } else {
            return response
        }
    }
}
