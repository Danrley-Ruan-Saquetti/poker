import { Injection } from '@esliph/injection'
import { Result } from '@esliph/common'
import { ID } from '@@types'
import { Service, ServiceContext } from '@common/module/decorator'
import { DeckRepository } from '@modules/deck/deck.repository'
import { Deck } from '@modules/deck/deck.model'

@Service({ name: 'deck.use-case.find', context: ServiceContext.USE_CASE })
export class DeckFindUseCase {
    constructor(@Injection.Inject('deck.repository') private repository: DeckRepository) {}

    findById(data: { id: ID }) {
        const deck = this.repository.findFirst({ where: { id: { equals: data.id } } })

        if (!deck) {
            return Result.failure<Deck>({ title: 'Find Deck', message: 'Deck not Found' })
        }

        return Result.success<Deck>(deck)
    }

    findByRoomId(data: { roomId: ID }) {
        const deck = this.repository.findFirst({ where: { roomId: { equals: data.roomId } } })

        if (!deck) {
            return Result.failure<Deck>({ title: 'Find Deck', message: 'Deck not Found' })
        }

        return Result.success<Deck>(deck)
    }

    findMany() {
        return Result.success<Deck[]>(this.repository.findMany())
    }
}
