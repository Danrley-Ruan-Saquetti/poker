import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { GameRepository } from '@modules/game/game.repository'
import { DeckRepository } from '@modules/deck/deck.repository'
import { CardCreateUseCase } from '@modules/card/use-case/create.use-case'

@Service({ name: 'deck.use-case.create', context: 'Use Case' })
export class DeckCreateUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('card.use-case.create') private cardCreateUC: CardCreateUseCase,
        @Injection.Inject('deck.repository') private deckRepository: DeckRepository
    ) {}

    perform(data: { gameId: ID }) {
        if (!this.gameRepository.isExists({ where: { id: { equals: data.gameId } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Game not found' })
        }

        const roomResult = this.roomQueryUC.getRoomByGameId({ gameId: data.gameId })

        if (!roomResult.isSuccess()) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Room not found' })
        }

        if (this.deckRepository.isExists({ where: { roomId: { equals: roomResult.getValue().id } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Deck already exist' })
        }

        const { id } = this.deckRepository.create({
            data: {
                roomId: data.gameId
            }
        })

        this.cardCreateUC.performCreateByDeckId({ deckId: id })

        return Result.success({ ok: true })
    }

    performCreateByRoomId(data: { roomId: ID }) {
        const roomResult = this.roomQueryUC.getRoomId({ roomId: data.roomId })

        if (!roomResult.isSuccess()) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Room not found' })
        }

        if (this.deckRepository.isExists({ where: { roomId: { equals: roomResult.getValue().id } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Deck already exist' })
        }

        const { id } = this.deckRepository.create({
            data: {
                roomId: roomResult.getValue().gameId
            }
        })

        this.cardCreateUC.performCreateByDeckId({ deckId: id })

        return Result.success({ ok: true })
    }
}
