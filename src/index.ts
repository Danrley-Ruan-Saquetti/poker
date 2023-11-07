import { Bootstrap } from '@core/bootstrap'
import { Client } from '@esliph/http'
import { MainModule } from '@main.module'
import { PlayerModel, PlayerStatus } from '@modules/player/player.model'

Bootstrap(MainModule, { serverLocal: true, port: 8080 })

const user: PlayerModel = {
    balance: 5000,
    blindType: null,
    isCurrentBidding: false,  isDealer: false, name: 'Dan Ruan',
    order: 0,
    roomId: null,
    status: PlayerStatus.AWAY
}

const client = new Client()

client.on('request/end', (data) => console.log(data))

client.post('/player/create', user)