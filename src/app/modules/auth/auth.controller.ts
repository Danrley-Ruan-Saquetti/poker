import { Request, Response } from '@esliph/http'
import { Get, Post } from '@common/http'
import { Injection } from '@esliph/injection'
import { Controller } from '@common/module/decorator'
import { AuthService } from '@modules/auth/auth.service'
import { Guard } from '@common/module/decorator/guard'

@Controller()
export class AuthController {
    constructor(
        @Injection.Inject('auth.service') private authService: AuthService
    ) { }

    @Post('/auth/login')
    login(req: Request, res: Response) {
        const instance = this || Injection.resolve(AuthController)

        return instance.authService.login(req.body)
    }
}
