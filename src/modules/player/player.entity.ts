export type PlayerId = number

export interface PlayerModel {
    id: PlayerId
    name: string
    money: number
}

export class PlayerEntity implements PlayerModel {
    id: PlayerId
    name: string
    money: number
}
