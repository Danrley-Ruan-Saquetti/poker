import { CardSuit } from 'src/modules/card/card.entity'

const MAX_SUIT_LENGTH = Object.keys(CardSuit).length
const MAX_CARD_FOR_SUIT_LENGTH = 13

export const RULES_GAME = {
    maxLengthPlayersInRoom: 9,
    maxSuitLength: MAX_SUIT_LENGTH,
    maxCardLengthForSuit: MAX_CARD_FOR_SUIT_LENGTH,
    maxCardLength: MAX_SUIT_LENGTH * MAX_CARD_FOR_SUIT_LENGTH,
    maxCardForPlayer: 2
} as const
