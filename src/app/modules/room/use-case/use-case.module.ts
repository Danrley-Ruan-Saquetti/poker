import { Module } from '@common/module/decorator'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { RoomCreateUseCase } from '@modules/room/use-case/create.use-case'

@Module({
    providers: [RoomQueryUseCase, RoomCreateUseCase]
})
export class RoomUseCaseModule { }
