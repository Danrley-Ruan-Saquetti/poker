import { Document } from '@esliph/repository-memory'

export enum BlindType {
    SMALL_BLIND = 'SMALL_BLIND',
    BIG_BLIND = 'BIG_BLINDd'
}
export enum PlayerStatus {
    WAITING = 'WAITING',
    READY = 'READY',
    PLAYING = 'PLAYING',
    AWAY = 'AWAY'
}

export type PlayerModel = {
    login: string
    password: string
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

export type PlayerInfoPrivate = 'password' | 'blindType' | 'isDealer ' | 'isCurrentBidding' | 'isDealer' | 'order' | 'status' | 'roomId'

export type PlayerInfoPublic = Omit<Player, PlayerInfoPrivate>

export type PlayerWithoutPassword = Omit<Player, 'password'>
