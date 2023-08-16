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
        const gameDoc = this.repository.create({
            data: { isRunning: false, currentDealer: 0, currentPlayerBetting: 0, biggestBet: 0, playerCheckpointBiggestBet: 0 }
        })

        const game = new GameEntity(gameDoc)

        return game
    }

    updateGameById(gameId: GameId, args: Omit<GameModel, 'id'>) {
        this.repository.update({ where: { id: gameId }, data: { ...args } })
    }

    getGameById(id: GameId) {
        return this.repository.findFirst({ where: { id } })
    }

    getGamesById(ids: GameId[]) {
        return this.repository.findManyOR({ where: ids.map(id => ({ id })) })
    }

    private get repository() {
        return GameController.repository
    }
}
