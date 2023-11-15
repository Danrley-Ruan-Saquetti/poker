import { Module } from '@common/module/decorator'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { RoomCreateUseCase } from '@modules/room/use-case/create.use-case'
import { RoomFindUseCase } from '@modules/room/use-case/find.use-case'

@Module({
    providers: [RoomQueryUseCase, RoomCreateUseCase, RoomFindUseCase]
})
export class RoomUseCaseModule { }
