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
        return this.repository.findAll()
    }

    createGame() {
        const gameDoc = this.repository.create({ isRunning: false, lastDealer: 0 })

        const game = new GameEntity(gameDoc.id, gameDoc.isRunning, gameDoc.lastDealer)

        return game
    }

    updateGameById(args: GameModel) {
        this.repository.updateById(args.id, args)
    }

    getGameById(id: GameId) {
        return this.repository.findById(id)
    }

    getGamesById(ids: GameId[]) {
        return this.repository.findManyWithOr(ids.map(id => ({ id })))
    }

    private get repository() {
        return GameController.repository
    }
}
