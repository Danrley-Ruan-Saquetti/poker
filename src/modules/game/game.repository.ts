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
import { GameModel } from './game.entity'

export type GameArgsDefault = ArgsDefault<GameModel>
export type GameCreateArgs = CreateArgs<GameModel>
export type GameCreateManyArgs = CreateManyArgs<GameModel>
export type GameDeleteArgs = DeleteArgs<GameModel>
export type GameDeleteManyArgs = DeleteManyArgs<GameModel>
export type GameQueryArgs = QueryArgs<GameModel>
export type GameQueryArgsDefault = QueryArgsDefault<GameModel>
export type GameUpdateArgs = UpdateArgs<GameModel>
export type GameUpdateArgsDefault = UpdateArgsDefault<GameModel>
export type GameQueryManyArgs = QueryManyArgs<GameModel>

export class GameRepository extends Repository<GameModel> {}
