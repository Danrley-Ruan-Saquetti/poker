import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types/index'
import { Service, ServiceContext } from '@common/module/decorator'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { DeckRepository } from '@modules/deck/deck.repository'
import { CardCreateUseCase } from '@modules/card/use-case/create.use-case'
import { GameQueryUseCase } from '@modules/game/use-case/query.use-case'

@Service({ name: 'deck.use-case.create', context: ServiceContext.USE_CASE })
export class DeckCreateUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameQueryUC: GameQueryUseCase,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('card.use-case.create') private cardCreateUC: CardCreateUseCase,
        @Injection.Inject('deck.repository') private deckRepository: DeckRepository
    ) {}

    createByGameId(data: { gameId: ID }) {
        if (!this.gameQueryUC.findById({ id: data.gameId })) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Game not found' })
        }

        const roomResult = this.roomQueryUC.queryByGameId({ gameId: data.gameId })

        if (!roomResult.isSuccess()) {
            return Result.failure<{ ok: boolean }>(roomResult.getError())
        }

        return this.createByRoomId({ roomId: roomResult.getValue().id })
    }

    createByRoomId(data: { roomId: ID }) {
        const roomResult = this.roomQueryUC.queryById({ id: data.roomId })

        if (!roomResult.isSuccess()) {
            return Result.failure<{ ok: boolean }>(roomResult.getError())
        }

        return this.performCreate({ roomId: data.roomId })
    }

    private performCreate(data: { roomId: ID }) {
        if (this.deckRepository.isExists({ where: { roomId: { equals: data.roomId } } })) {
            return Result.failure<{ ok: boolean }>({ title: 'Create Deck', message: 'Deck already exist' })
        }

        const { id } = this.deckRepository.create({
            data: {
                roomId: data.roomId
            }
        })

        this.cardCreateUC.createByDeckId({ deckId: id })

        return Result.success({ ok: true })
    }
}
