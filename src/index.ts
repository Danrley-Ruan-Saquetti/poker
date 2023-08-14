import { AppController } from './modules/app.controller'

function bootstrap() {
    const app = new AppController()

    app.initComponents()

    const game = app.newGame()

    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Dan' })

    console.log(game.getState())
}

bootstrap()
