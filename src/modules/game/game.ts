import { RULES_GAME } from '../../common/rules'
import { CardController } from '../card/card.controller'
import { DeckController } from '../deck/deck.controller'
import { PlayerController } from '../player/player.controller'
import { PlayerModel } from '../player/player.entity'
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

    initComponents() {
        this.idRoom = this.roomController.createRoom(this.idGame).id
        this.deckController.createDeck(this.idRoom)
    }

    newPlayer({ money, name }: Omit<PlayerModel, 'id' | 'room' | 'cards' | 'active'>) {
        if (!this.validNewPlayer()) {
            throw new Error('Cannot add player because max length players exceeded')
        }

        const player = this.playerController.createPlayer({
            money,
            name,
            room: {
                id: this.getState().room.id,
                order: this.getOrder()
            }
        })

        if (this.getPlayers().players.length >= 2) {
            if (!this.getGame().isRunning) {
                this.newRound()
            }
        }

        return player
    }

    private validNewPlayer() {
        return this.getPlayers().players.length < RULES_GAME.maxLengthPlayersInRoom
    }

    private getOrder() {
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
    private newRound() {
        this.resetDeck()
        this.distributeCards()
    }

    private resetDeck() {
        const { players } = this.getPlayers()

        this.deckController.updateDeckById(this.getDeck().deck.id, { cards: this.getDeck().deck.cards.map(card => ({ id: card.id, inDeck: true })) })

        players.forEach(player => {
            player.cards = []

            this.playerController.updatePlayerById(player.id, player)
        })
    }

    private distributeCards() {
        const { players } = this.getPlayersInOrder()

        for (let i = 0; i < RULES_GAME.maxCardForPlayer; i++) {
            players.forEach(player => {
                player.cards.push(this.chooseCard())
            })
        }

        players.forEach(player => this.playerController.updatePlayerById(player.id, player))
    }

    private chooseCard() {
        const { id: deckId } = this.getDeck().deck
        const cardsInDeck = this.getCardsInPack()

        const index = Math.round(Math.random() * (cardsInDeck.length - 1 - 1)) + 1

        const cardSelected = cardsInDeck[index]

        this.deckController.updateCardById(deckId, cardSelected.id, { inDeck: false })

        return cardSelected.id
    }

    // State
    getState() {
        const { players } = this.getPlayersInOrder()
        const { room } = this.getRoom()
        const { deck } = this.getDeck()

        return { room, players, deck }
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

    getPlayers() {
        const players = this.playerController.getPlayersByIdRoom(this.idRoom)

        return { players }
    }

    getGame() {
        const game = this.gameController.getGameById(this.idGame)

        return game as GameModel
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

        return this.deckController.getCardsInDeck(deck.id)
    }

    private getCardsInNotPack() {
        const { deck } = this.getDeck()

        return this.deckController.getCardsInNotDeck(deck.id)
    }
}
