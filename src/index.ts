import { AppController } from './modules/app.controller'

function bootstrap() {
    const app = new AppController()

    const game = app.newGame()

    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })
    game.newPlayer({ money: 100, name: 'Dan' })

    console.log(game.getState())
}

bootstrap()
