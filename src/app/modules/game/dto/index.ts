import { Validator } from '@common/module/decorator'

@Validator({ name: 'game.validate.dto' })
export class GameValidateDTO {
    perform(data: any) {}
}
