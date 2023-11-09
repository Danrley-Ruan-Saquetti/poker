import { Request, Response } from '@esliph/http'
import { Post } from '@common/http'
import { Injection } from '@esliph/injection'
import { Controller } from '@common/module/decorator'
import { AuthLoginUseCase } from '@modules/auth/use-case/login.use-case'

@Controller()
export class AuthController {
    constructor(
        @Injection.Inject('auth.use-case.login') private loginUC: AuthLoginUseCase,
    ) { }

    @Post('/auth/login')
    login(req: Request, res: Response) {
        return this.loginUC.perform(req.body)
    }
}
