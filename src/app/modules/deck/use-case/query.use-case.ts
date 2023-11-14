import { Result } from '@esliph/common'
import { Injection } from '@esliph/injection'
import { Service, ServiceContext } from '@common/module/decorator'
import { ID } from '@@types'
import { Deck } from '@modules/deck/deck.model'
import { DeckRepository } from '@modules/deck/deck.repository'

@Service({ name: 'deck.use-case.query', context: ServiceContext.USE_CASE })
export class DeckQueryUseCase {
    constructor(@Injection.Inject('deck.repository') private deckRepository: DeckRepository) {}

    getById(data: { id: ID }) {
        const deck = this.deckRepository.findFirst({ where: { id: { equals: data.id } } })

        if (!deck) {
            return Result.failure<Deck>({ title: 'Find Deck', message: 'Cannot found deck' })
        }

        return Result.success<Deck>(deck)
    }

    getByRoomId(data: { roomId: ID }) {
        const deck = this.deckRepository.findFirst({ where: { roomId: { equals: data.roomId } } })

        if (!deck) {
            return Result.failure<Deck>({ title: 'Find Deck', message: 'Cannot found deck' })
        }

        return Result.success<Deck>(deck)
    }
}
