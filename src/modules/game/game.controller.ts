import { DeckController } from '../deck/deck.controller'
import { RoomController } from '../room/room.controller'
import { GameEntity, GameId, GameModel } from './game.entity'
import { GameRepository } from './game.repository'

export class GameController {
    private static repository = new GameRepository()
    private roomController = new RoomController()
    private deckController: DeckController

    constructor() {
        this.deckController = new DeckController()
    }

    generateDeckInRepository() {
        this.deckController.generateDeckInRepository()
    }

    getGames() {
        return GameController.repository.findAll()
    }

    createGame() {
        const gameDoc = GameController.repository.add({ isRunning: false })

        const game = new GameEntity(gameDoc.id, gameDoc.isRunning)

        return game
    }

    updateGameById(args: GameModel) {
        GameController.repository.updateById(args.id, args)
    }

    getGameById(id: GameId) {
        return GameController.repository.findById(id)
    }

    getGamesById(ids: GameId[]) {
        return GameController.repository.findManyWithOr(ids.map(id => ({ id })))
    }
}
