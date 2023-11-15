import { ID } from '@@types'
import { Document } from '@esliph/repository-memory'

export type DeckModel = {
    roomId: ID
}

export type Deck = Document<DeckModel>
