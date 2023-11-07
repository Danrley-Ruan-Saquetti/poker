import { Document } from '@esliph/repository-memory'

export enum BlindType {
    SMALL_BLIND = 'Small Blind',
    BIG_BLIND = 'Big Blind'
}
export enum PlayerStatus {
    WAITING = 'Waiting',
    READY = 'Ready',
    PLAYING = 'Playing',
    AWAY = 'Away'
}

export type PlayerModel = {
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
