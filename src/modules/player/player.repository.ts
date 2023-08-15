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
    UpdateArgsDefault
} from 'src/common/repository'
import { PlayerModel } from './player.entity'

export type PlayerArgsDefault = ArgsDefault<PlayerModel>
export type PlayerCreateArgs = CreateArgs<PlayerModel>
export type PlayerCreateManyArgs = CreateManyArgs<PlayerModel>
export type PlayerDeleteArgs = DeleteArgs<PlayerModel>
export type PlayerDeleteManyArgs = DeleteManyArgs<PlayerModel>
export type PlayerQueryArgs = QueryArgs<PlayerModel>
export type PlayerQueryArgsDefault = QueryArgsDefault<PlayerModel>
export type PlayerUpdateArgs = UpdateArgs<PlayerModel>
export type PlayerUpdateArgsDefault = UpdateArgsDefault<PlayerModel>

export class PlayerRepository extends Repository<PlayerModel> {}
