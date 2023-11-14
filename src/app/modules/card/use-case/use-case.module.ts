import { Module } from '@common/module/decorator'
import { CardCreateUseCase } from '@modules/card/use-case/create.use-case'
import { CardQueryUseCase } from '@modules/card/use-case/query.use-case'
import { CardFindUseCase } from '@modules/card/use-case/find.use-case'

@Module({
    providers: [CardCreateUseCase, CardQueryUseCase, CardFindUseCase]
})
export class CardUseCaseModule {}
