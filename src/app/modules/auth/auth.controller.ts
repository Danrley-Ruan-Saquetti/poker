import { Request, Response } from '@esliph/http'
import { Post } from '@common/http'
import { Injection } from '@esliph/injection'
import { Controller } from '@common/module/decorator'
import { AuthService } from '@modules/auth/auth.service'

@Controller()
export class AuthController {
    constructor(
        @Injection.Inject('auth.service') private authService: AuthService
    ) { }

    @Post('/auth/login')
    login(req: Request, res: Response) {
        return this.authService.login(req.body)
    }
}
