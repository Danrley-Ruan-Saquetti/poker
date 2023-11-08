import { ID } from '@@types/index'
import { Document } from '@esliph/repository-memory'

export type RoomModel = {
    gameId: ID
    minimumBetAmount: number
    betValueCurrentRound: number
    potAmount: number
    orderCurrentDealer: number
    orderCurrentSmallBlind: number
    orderCurrentBigBlind: number
    orderCurrentBidding: number
    betTimeout: number
}

export type Room = Document<RoomModel>