import { ID } from '@@types'
import { Document } from '@esliph/repository-memory'

export type RoomModel = {
    gameId: ID
    playersLimit: number
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
