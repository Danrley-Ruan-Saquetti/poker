import {} from '@esliph/observer'
import { Controller } from '@common/decorator'
import { Injection } from '@esliph/injection'
import { UserService } from '@modules/user/user.service'

@Controller()
export class UserController {
    constructor(@Injection.Inject('user.service') private service: UserService) {}
}
