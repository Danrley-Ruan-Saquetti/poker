import { Document } from '@esliph/repository-memory'

export enum BlindType {
    SMALL_BLIND = 'SMALL_BLIND',
    BIG_BLIND = 'BIG_BLINDd'
}
export enum PlayerStatus {
    WAITING = 'WAITING',
    READY = 'READY',
    PLAYING = 'PLAYING',
    AWAY = 'AWAYy'
}

export type PlayerModel = {
    login: string,
    password: string,
    name: string
    balance: number
    roomId: number | null
    order: number
    status: PlayerStatus
    isDealer: boolean
    blindType: BlindType | null
    isCurrentBidding: false
}

export type Player = Document<PlayerModel>
