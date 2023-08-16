import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { AppController } from './modules/app.controller'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

    app.get('/players/not-gaming', (req, res) => {
        res.send({ players: game.getPlayersNotInGame().players })
    })

    app.post('/players/:id/bet', (req, res) => {
        const { value } = req.body

        if (!value || isNaN(Number(value))) {
            return res.status(400).send({ message: 'Value invalid' })
        }

        const response = game.playerBet(Number(req.params.id), Number(value))

        res.send(response || { ok: true })
    })

    app.get('/players/:id', (req, res) => {
        const { player } = game.getPlayerById(Number(req.params.id))

        if (!player) {
            return res.send({ player: null })
        }

        player.cards = game.getCardsOfPlayer(player.id).cards as any

        res.send({ player })
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
