import { Document } from '@esliph/repository-memory'

/*
A criação de uma sala deve conter um identificador único, o valor da aposta mínimo, o valor da aposta atual da rodada,
o valor do pote, o atual Dealer (sua ordem na mesa), o atual Small Blind (sua ordem na mesa),
o atual Big Blind (sua ordem na mesa), o atual jogador a fazer o lance (sua ordem na mesa), o tempo limite para cada jogador
 realizar o lance, o baralho de cartas e a lista com a sequência da ordem dos jogadores do giro
*/

export type RoomModel = {
    minimumBetAmount: number
    betValueCurrentRound: number
    potAmmount: number
    orderCurrentDealer: number
    orderCurrentSmallBlind: number
    orderCurrentBigBlind: number
    orderCurrentBidding: number
    betTimeout: number
    deckCards: number[]
}

export type Room = Document<RoomModel>
