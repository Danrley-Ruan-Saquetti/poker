import { Game } from './game/game'
import { GameController } from './game/game.controller'

export class AppController {
    private gameController: GameController

    constructor() {
        this.gameController = new GameController()
    }

    initComponents() {
        this.gameController.generateDeckInRepository()
    }

    newGame() {
        const gameEntity = this.gameController.createGame()

        const game = new Game(gameEntity.id)

        game.initComponents()

        return game
    }
}
