import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { GameRepository } from '@modules/game/game.repository'
import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { DeckRepository } from '@modules/deck/deck.repository'

@Service({ name: 'deck.use-case.create', context: 'Use Case' })
export class DeckCreateUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('deck.repository') private deckRepository: DeckRepository,
    ) { }

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

        this.deckRepository.create({
            data: {
                roomId: data.gameId
            }
        })

        return Result.success({ ok: true })
    }
}
