import { Post, Request, Response } from '@esliph/http';
import { Injection } from '@esliph/injection';
import { Controller } from '@common/module/decorator'
import { AuthService } from '@modules/auth/auth.service';

@Controller()
export class AuthController {
    constructor(
        @Injection.Inject('auth.service') private authService: AuthService
    ) {}

    @Post('/auth/login')
    login(req: Request, res: Response) {
        const instance = this || Injection.resolve(AuthController)

        return instance.authService.login(req.body)
    }
}
