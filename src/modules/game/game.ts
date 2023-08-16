import { RULES_GAME } from '../../common/rules'
import { CardController } from '../card/card.controller'
import { DeckController } from '../deck/deck.controller'
import { PlayerController } from '../player/player.controller'
import { PlayerId, PlayerModel } from '../player/player.entity'
import { RoomController } from '../room/room.controller'
import { RoomId } from '../room/room.entity'
import { GameController } from './game.controller'
import { GameId, GameModel } from './game.entity'

export class Game {
    private gameController: GameController
    private roomController: RoomController
    private playerController: PlayerController
    private deckController: DeckController
    private cardController: CardController
    private idRoom: RoomId

    constructor(private idGame: GameId) {
        this.gameController = new GameController()
        this.cardController = new CardController()
        this.roomController = new RoomController()
        this.playerController = new PlayerController()
        this.deckController = new DeckController()
    }

    setup() {
        this.idRoom = this.roomController.getRoomByIdGame(this.idGame)?.id as number
    }

    initComponents() {
        this.idRoom = this.roomController.createRoom(this.idGame).id
        this.deckController.createDeck(this.idRoom)
    }

    newPlayer({ money, name }: Omit<PlayerModel, 'id' | 'room' | 'cards' | 'active' | 'inGame' | 'isDealer' | 'isBetting'>) {
        if (!this.validNewPlayer()) {
            throw new Error('Cannot create player because max length players exceeded')
        }

        const player = this.playerController.createPlayer({
            money,
            name,
            room: {
                id: this.getState().room.id,
                order: this.getOrderUnused()
            }
        })

        return player
    }

    private validNewPlayer() {
        return this.getPlayers().players.length < RULES_GAME.maxLengthPlayersInRoom
    }

    private getOrderUnused() {
        const { players } = this.getPlayers()

        if (!this.validNewPlayer()) {
            throw new Error('Cannot get order because max length players exceeded')
        }

        let order: number

        do {
            order = Math.round(Math.random() * (RULES_GAME.maxLengthPlayersInRoom - 1)) + 1
        } while (players.find(player => player.room.order == order))

        return order
    }

    // Game Logic
    newRound() {
        this.resetDeck()
        this.updateListPlayersInGame()
        this.updateDealer()
        this.updatePlayerBetting()
        this.distributeCards()
    }

    startRound() {
        const { game } = this.getGame()

        this.gameController.updateGameById(game.id, { ...game, isRunning: true })
    }

    playerBet(playerId: PlayerId, value: number) {
        const { game } = this.getGame()
        const { player } = this.getPlayerById(playerId)

        if (!player) {
            return { message: 'Player not found' }
        }

        const isValidBet = this.validBet(player, value)

        if (!isValidBet) {
            return { message: 'Bet not valid' }
        }

        this.playerController.updatePlayerById(player.id, {
            ...player,
            isBetting: false,
            money: player.money - value
        })

        if (value > game.biggestBet) {
            this.gameController.updateGameById(game.id, {
                ...game,
                biggestBet: value,
                playerCheckpointBiggestBet: player.room.order
            })
        }

        const { playerPreviewBetting } = this.getLastPlayerBetInRound()

        if (playerPreviewBetting.room.order == player.room.order) {
            console.log('End round')
        }

        this.updatePlayerBetting()

        return { message: `${player.name} bet R$${value}` }
    }

    private validBet(player: PlayerModel, value: number) {
        const { game } = this.getGame()

        if (player.room.order != game.currentPlayerBetting) {
            return false
        }

        if (player.money < value) {
            return false
        }

        if (game.biggestBet > value) {
            return false
        }

        return true
    }

    private finalRoundOfBetting() {}

    private updateDealer() {
        const { game } = this.getGame()
        const { dealer } = this.getNextDealer()

        game.currentDealer = dealer.room.order

        this.gameController.updateGameById(game.id, game)
        this.playerController.updatePlayerById(dealer.id, { ...dealer, isDealer: true })
    }

    private updatePlayerBetting() {
        const { game } = this.getGame()
        const { playerBetting } = this.getNextPlayerBetting()

        game.currentPlayerBetting = playerBetting.room.order

        this.gameController.updateGameById(game.id, game)
        this.playerController.updatePlayerById(playerBetting.id, { ...playerBetting, isBetting: true })
    }

    getNextDealer() {
        const { game } = this.getGame()
        const { players } = this.getPlayersInGame()

        const player = players.find(player => player.room.order > game.currentDealer) || (players[0] as PlayerModel)

        return { dealer: player }
    }

    getNextPlayerBetting() {
        const { game } = this.getGame()
        const { players } = this.getPlayersInGame()

        const indexCurrentOrder =
            players.findIndex(player => player.room.order == game.currentPlayerBetting) || players.findIndex(player => player.room.order == game.currentDealer)

        const indexNextOrder = indexCurrentOrder < 0 ? players.findIndex(player => player.room.order == game.currentDealer) + 1 : indexCurrentOrder + 1

        const indexNextPlayer = indexNextOrder >= players.length ? 0 : indexNextOrder

        return { playerBetting: players[indexNextPlayer] }
    }

    getLastPlayerBetInRound() {
        const { game } = this.getGame()
        const { players } = this.getPlayersInGame()

        const indexCheckpointBiggestBet = players.findIndex(player => player.room.order == game.playerCheckpointBiggestBet)

        if (indexCheckpointBiggestBet < 0) {
            return { playerPreviewBetting: players[players.length - 1] }
        }

        const indexNextOrder = indexCheckpointBiggestBet - 1

        const indexNextPlayer = indexNextOrder < 0 ? players.length - 1 : indexNextOrder

        return { playerPreviewBetting: players[indexNextPlayer] }
    }

    getDealer() {
        return this.playerController.query({
            isDealer: true,
            room: {
                id: this.idRoom
            }
        })
    }

    getPlayerBetting() {
        return this.playerController.query({
            isBetting: true,
            room: {
                id: this.idRoom
            }
        })
    }

    private resetDeck() {
        const { players } = this.getPlayers()

        players.forEach(player => {
            player.cards = []

            this.playerController.updatePlayerById(player.id, player)
        })

        this.deckController.updateDeckById(this.getDeck().deck.id, { cards: this.getDeck().deck.cards.map(card => ({ id: card.id, inDeck: true })) })
    }

    private updateListPlayersInGame() {
        const { players } = this.getPlayersInOrder()

        players.forEach(player => {
            player.active = player.money > 0
            player.isDealer = false
            player.isBetting = false

            this.playerController.updatePlayerById(player.id, player)
        })
    }

    private distributeCards() {
        for (let i = 0; i < RULES_GAME.maxCardForEachPlayer; i++) {
            this.distributeOneCardForEachPlayer()
        }
    }

    private distributeOneCardForEachPlayer() {
        const { players } = this.getPlayersInGame()

        players.forEach(player => {
            player.cards.push(this.chooseCard())
        })

        players.forEach(player => this.playerController.updatePlayerById(player.id, player))
    }

    private chooseCard() {
        const { id: deckId } = this.getDeck().deck
        const { cards } = this.getCardsInPack()

        const index = Math.round(Math.random() * (cards.length - 1 - 1)) + 1

        const cardSelected = cards[index]

        this.deckController.updateCardById(deckId, cardSelected.id, { inDeck: false })

        return cardSelected.id
    }

    // State
    getState() {
        const { players } = this.getPlayersInOrder()
        const { room } = this.getRoom()
        const { deck } = this.getDeck()
        const { cards } = this.getCardsInPack()

        return { room, players, deck, cards }
    }

    getRoom() {
        const room = this.roomController.getRoomByIdGame(this.idGame)

        if (!room) {
            throw new Error(`Room of game ${this.idGame} not found`)
        }

        return { room }
    }

    getPlayersInOrder() {
        const { players } = this.getPlayers()

        const playersInOrder = players.sort((p1, p2) => p1.room.order - p2.room.order)

        return { players: playersInOrder }
    }

    getPlayersInOrderStartsDealer() {
        const { players: playersInGame } = this.getPlayersInGame()
        const dealer = this.getDealer()

        if (!dealer) {
            return { players: [] }
        }

        const indexDealer = playersInGame.findIndex(player => player.id == dealer.id)

        if (indexDealer < 0) {
            return { players: [] }
        }

        const players: PlayerModel[] = []

        for (let i = 0; i < playersInGame.length; i++) {
            const indexAdjusted = i >= indexDealer ? i - indexDealer : i + indexDealer

            players.push(playersInGame[indexAdjusted])
        }

        return { players }
    }

    getPlayersInGame() {
        const { players } = this.getPlayersInOrder()

        const playersInGame = players.filter(({ active }) => active)

        return { players: playersInGame }
    }

    getPlayersNotInGame() {
        const { players } = this.getPlayersInOrder()

        const playersNotInGame = players.filter(({ active }) => !active)

        return { players: playersNotInGame }
    }

    getPlayersInGameWithCards() {
        const { players } = this.getPlayersInOrder()

        const playersInGame = players.filter(({ active }) => active)

        const playersInGameWithCards = playersInGame.map(player => ({ ...player, cards: this.cardController.getCardsById(player.cards) }))

        return { players: playersInGameWithCards }
    }

    getCardsOfPlayer(playerId: PlayerId) {
        const { player } = this.getPlayerById(playerId)

        if (!player) {
            return { cards: [] }
        }

        return { cards: this.cardController.getCardsById(player.cards) }
    }

    getPlayerById(id: PlayerId) {
        return { player: this.playerController.getPlayerById(id) }
    }

    getPlayers() {
        const players = this.playerController.getPlayersByIdRoom(this.idRoom)

        return { players }
    }

    getGame() {
        const game = this.gameController.getGameById(this.idGame) as GameModel

        return { game }
    }

    getDeck() {
        const deck = this.deckController.getDeckByIdRoom(this.idRoom)

        if (!deck) {
            throw new Error(`Deck of game ${this.idGame} not found`)
        }

        return { deck }
    }

    private getCardsInPack() {
        const { deck } = this.getDeck()

        return { cards: this.deckController.getCardsInDeck(deck.id) }
    }

    private getCardsInNotPack() {
        const { deck } = this.getDeck()

        return { cards: this.deckController.getCardsInNotDeck(deck.id) }
    }
}
