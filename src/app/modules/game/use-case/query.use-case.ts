import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { ID } from '@@types/index'
import { Service } from '@common/module/decorator'
import { GameRepository } from '@modules/game/game.repository'
import { PlayerQueryUseCase } from '@modules/player/use-case/query.use-case'
import { DeckQueryUseCase } from '@modules/deck/use-case/query.use-case'
import { RoomQueryUseCase } from '@modules/room/use-case/query.use-case'
import { GameState } from '@modules/game/game.model'
import { CardQueryUseCase } from '@modules/card/use-case/query.use-case'

@Service({ name: 'game.use-case.query', context: 'Use Case' })
export class GameQueryUseCase {
    constructor(
        @Injection.Inject('game.repository') private gameRepository: GameRepository,
        @Injection.Inject('player.use-case.query') private playerQueryUC: PlayerQueryUseCase,
        @Injection.Inject('room.use-case.query') private roomQueryUC: RoomQueryUseCase,
        @Injection.Inject('card.use-case.query') private cardQueryUC: CardQueryUseCase,
        @Injection.Inject('deck.use-case.query') private deckQueryUC: DeckQueryUseCase
    ) {}

    getState(data: { gameId: ID }) {
        const game = this.gameRepository.findFirst({ where: { id: { equals: data.gameId } } })

        if (!game) {
            return Result.failure<GameState>({ title: 'Get State in Game', message: 'Game not found' })
        }

        const roomResult = this.roomQueryUC.getRoomByGameId({ gameId: data.gameId })

        if (!roomResult) {
            return Result.failure<GameState>({ title: 'Get State in Game', message: 'Room not found' })
        }

        return this.getStateByRoomId({ roomId: roomResult.getValue().id })
    }

    getStateByRoomId(data: { roomId: ID }) {
        const roomResult = this.roomQueryUC.getRoomId({ roomId: data.roomId })

        if (!roomResult) {
            return Result.failure<GameState>({ title: 'Get State in Game', message: 'Room not found' })
        }

        const game = this.gameRepository.findFirst({ where: { id: { equals: roomResult.getValue().gameId } } })

        if (!game) {
            return Result.failure<GameState>({ title: 'Get State in Game', message: 'Game not found' })
        }

        const playersResult = this.playerQueryUC.findManyByRoomId({ roomId: data.roomId })

        if (!playersResult.isSuccess()) {
            return Result.failure<GameState>({ title: 'Get State in Game', message: 'Cannot found players' })
        }

        const deckResult = this.deckQueryUC.getByRoomId({ roomId: roomResult.getValue().id })

        if (!deckResult.isSuccess()) {
            return Result.failure<GameState>({ title: 'Get State in Game', message: 'Cannot found deck' })
        }

        return Result.success<GameState>({
            game,
            room: roomResult.getValue(),
            players: playersResult.getValue(),
            deck: deckResult.getValue()
        })
    }
}
