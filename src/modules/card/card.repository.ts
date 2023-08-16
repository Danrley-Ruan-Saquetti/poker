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
import { CardModel } from './card.entity'

export type CardArgsDefault = ArgsDefault<CardModel>
export type CardCreateArgs = CreateArgs<CardModel>
export type CardCreateManyArgs = CreateManyArgs<CardModel>
export type CardDeleteArgs = DeleteArgs<CardModel>
export type CardDeleteManyArgs = DeleteManyArgs<CardModel>
export type CardQueryArgs = QueryArgs<CardModel>
export type CardQueryManyArgs = QueryManyArgs<CardModel>
export type CardQueryArgsDefault = QueryArgsDefault<CardModel>
export type CardUpdateArgs = UpdateArgs<CardModel>
export type CardUpdateArgsDefault = UpdateArgsDefault<CardModel>

export class CardRepository extends Repository<CardModel> {}
