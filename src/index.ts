import express from 'express'
import { AppController } from './modules/app.controller'

const app = express()

function bootstrap() {
    console.log('Server listen on port 8080')

    const appController = new AppController()

    appController.initComponents()

    const game = appController.newGame()

    game.newPlayer({ money: 10000, name: 'Dan' })
    game.newPlayer({ money: 10000, name: 'Ruan' })
    game.newPlayer({ money: 10000, name: 'Davi' })

    game.newRound()

    game.newPlayer({ money: 10000, name: 'Ze' })
    game.newPlayer({ money: 10000, name: 'Ze' })
    game.newPlayer({ money: 10000, name: 'Ze' })
    game.newPlayer({ money: 10000, name: 'Ze' })
    game.newPlayer({ money: 10000, name: 'Ze' })
    game.newPlayer({ money: 10000, name: 'Ze' })

    game.startRound()

    app.get('/', (req, res) => {
        res.send({ ...game.getState(), ...game.getGame() })
    })

    app.get('/game', (req, res) => {
        res.send(game.getGame())
    })

    app.get('/cards', (req, res) => {
        res.send({ cards: game.getState().cards })
    })

    app.get('/players', (req, res) => {
        res.send({ players: game.getPlayers().players })
    })

    app.get('/players/gaming', (req, res) => {
        res.send({ players: game.getPlayersInGameWithCards().players })
    })

    app.get('/players/:id', (req, res) => {
        res.send({ player: game.getPlayerById(Number(req.params.id)).player })
    })

    app.get('/deck', (req, res) => {
        res.send({ deck: game.getState().deck })
    })

    app.get('/room', (req, res) => {
        res.send({ room: game.getState().room })
    })
}

app.listen(8080, bootstrap)

// bootstrap()
