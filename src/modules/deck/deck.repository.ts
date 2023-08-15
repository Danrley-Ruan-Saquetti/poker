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
import { DeckModel } from './deck.entity'

export type DeckArgsDefault = ArgsDefault<DeckModel>
export type DeckCreateArgs = CreateArgs<DeckModel>
export type DeckCreateManyArgs = CreateManyArgs<DeckModel>
export type DeckDeleteArgs = DeleteArgs<DeckModel>
export type DeckDeleteManyArgs = DeleteManyArgs<DeckModel>
export type DeckQueryArgs = QueryArgs<DeckModel>
export type DeckQueryArgsDefault = QueryArgsDefault<DeckModel>
export type DeckUpdateArgs = UpdateArgs<DeckModel>
export type DeckUpdateArgsDefault = UpdateArgsDefault<DeckModel>

export class DeckRepository extends Repository<DeckModel> {}
