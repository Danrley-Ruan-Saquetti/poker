import { RoomController } from '../room/room.controller'
import { GameEntity, GameId, GameModel } from './game.entity'
import { GameRepository } from './game.repository'

export class GameController {
    private static repository = new GameRepository()
    private roomController = new RoomController()

    getGames() {
        return GameController.repository.findAll()
    }

    createGame() {
        const gameDoc = GameController.repository.add({})

        const game = new GameEntity(gameDoc.id)

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
