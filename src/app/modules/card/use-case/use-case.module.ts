import { Module } from '@common/module/decorator'
import { CardCreateUseCase } from '@modules/card/use-case/create.use-case'
import { CardQueryUseCase } from '@modules/card/use-case/query.use-case'

@Module({
    providers: [CardCreateUseCase, CardQueryUseCase]
})
export class CardUseCaseModule {}
