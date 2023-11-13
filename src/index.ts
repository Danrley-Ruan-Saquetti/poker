import { Client } from '@esliph/http'
import { Bootstrap } from '@core/bootstrap'
import { MainModule } from '@main.module'
import { GameType } from '@modules/game/game.model'

const application = Bootstrap(MainModule, { serverLocal: true, port: 8080, logLoad: true, logEventHttp: true, logEventListener: true })

async function App() {
    const users = [
        await newUser({ balance: 5000, name: 'Dan Ruan', login: 'dan.ruan@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Ruan', login: 'ruan@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Davi', login: 'davi@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Nick', login: 'nick@gmail.com', password: '123' }),
        await newUser({ balance: 5000, name: 'Marcoto', login: 'marcoto@gmail.com', password: '123' })
    ]

    await users[0].post('/games/create', { gameType: GameType.TEXAS_HOLDEM })

    const { roomId } = (await users[0].get('/players/current')).getValue()

    users[0].use({ params: { roomId } })

    for (let i = 1; i < users.length; i++) {
        await users[i].post('/players/join-game', {}, { params: { roomId } })

        users[i].use({ params: { roomId } })
    }

    await users[0].get('/games/state').then(res => console.log(res.getValue()))
}

async function newUser(data: any) {
    const clientUser = new Client()

    const responseCreate = await clientUser.post('/players/create', data)

    if (!responseCreate.isSuccess()) {
        return clientUser
    }

    const responseToken = await clientUser.post('/auth/login', { login: data.login, password: data.password })

    if (!responseToken.isSuccess()) {
        return clientUser
    }

    clientUser.use({ headers: { Authorization: `Bearer ${responseToken.getValue().token}` } })

    return clientUser
}

App()
