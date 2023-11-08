console.clear()

import { Client } from '@esliph/http'
import { Bootstrap } from '@core/bootstrap'
import { MainModule } from '@main.module'
import { GameType } from './app/modules/game/game.model'

Bootstrap(MainModule, { serverLocal: true, port: 8080 })

const client = new Client()

client.on('request/error', arg => console.log(arg))

async function App() {
    const users = [
        await newUser({ balance: 5000, name: 'Dan Ruan', login: 'dan.ruan@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Ruan', login: 'ruan@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Davi', login: 'davi@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Nick', login: 'nick@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Marcoto', login: 'marcoto@gmail.com', password: '123' }),
    ]

    const resultCreateGame = await users[0].post('/games/create', { gameType: GameType.TEXAS_HOLDEM })

    for (let i = 1; i < users.length; i++) {
        users[i].post('/games/join', {}, { params: { roomId: resultCreateGame.getValue().id } })
    }
}

async function newUser(data: any) {
    const clientUser = new Client()

    const responseCreate = await clientUser.post('/players/create', data)

    if (!responseCreate.isSuccess()) { return clientUser }

    const responseToken = await clientUser.post('/auth/login', { login: data.login, password: data.password })

    if (!responseToken.isSuccess()) { return clientUser }

    clientUser.use({ headers: { Authorization: `Bearer ${responseToken.getValue().token}` } })

    return clientUser
}

App()
