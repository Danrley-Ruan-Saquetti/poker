import {
    Repository,
    ArgsDefault,
    CreateArgs,
    CreateManyArgs,
    DeleteArgs,
    DeleteManyArgs,
    QueryArgs,
    QueryArgsDefault,
    UpdateArgs,
    UpdateArgsDefault,
    QueryManyArgs
} from 'src/common/repository'
import { RoomModel } from './room.entity'

export type RoomArgsDefault = ArgsDefault<RoomModel>
export type RoomCreateArgs = CreateArgs<RoomModel>
export type RoomCreateManyArgs = CreateManyArgs<RoomModel>
export type RoomDeleteArgs = DeleteArgs<RoomModel>
export type RoomDeleteManyArgs = DeleteManyArgs<RoomModel>
export type RoomQueryArgs = QueryArgs<RoomModel>
export type RoomQueryArgsDefault = QueryArgsDefault<RoomModel>
export type RoomUpdateArgs = UpdateArgs<RoomModel>
export type RoomUpdateArgsDefault = UpdateArgsDefault<RoomModel>
export type RoomQueryManyArgs = QueryManyArgs<RoomModel>

export class RoomRepository extends Repository<RoomModel> {}
