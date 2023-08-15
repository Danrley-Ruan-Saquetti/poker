import { PartialDeep } from 'src/util'

export type RepositoryModel = { id: number }
export type ArgsDefault<Model extends RepositoryModel> = Omit<Model, 'id'>
export type CreateArgs<Model extends RepositoryModel> = { data: ArgsDefault<Model> }
export type CreateManyArgs<Model extends RepositoryModel> = { data: ArgsDefault<Model>[] }
export type QueryArgsDefault<Model extends RepositoryModel> = PartialDeep<Model>
export type QueryArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model> }
export type DeleteArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model> }
export type DeleteManyArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model> }
export type UpdateArgsDefault<Model extends RepositoryModel> = PartialDeep<ArgsDefault<Model>>
export type UpdateArgs<Model extends RepositoryModel> = { where: QueryArgs<Model>; data: UpdateArgsDefault<Model> }

export class Repository<Model extends RepositoryModel> {
    protected documents: Model[]
    private lastIndex: number

    constructor() {
        this.lastIndex = 0
        this.documents = []
    }

    create(args: CreateArgs<Model>) {
        this.lastIndex++

        const id = this.lastIndex

        const data = { ...args.data, id } as Model

        this.documents.push(data)

        return { ...data } as Model
    }

    createMany({ data }: CreateManyArgs<Model>) {
        return data.map(args => this.create({ data: args }))
    }

    delete({ where }: DeleteArgs<Model>) {
        const index = this.findIndex({ where })

        if (index < 0) {
            return
        }

        this.documents.splice(index, 1)
    }

    deleteMany(args: DeleteArgs<Model>) {
        for (let i = 0; i < this.documents.length; i++) {
            if (this.validDocQuery(this.documents[i], args)) {
                this.documents.splice(i, 1)
            }
        }
    }

    update(args: UpdateArgs<Model>) {
        const index = this.findIndex(args.where)

        if (index < 0) {
            return
        }

        this.updateByIndex(index, args.data)
    }

    updateMany(args: UpdateArgs<Model>) {
        for (let i = 0; i < this.documents.length; i++) {
            if (this.validDocQuery(this.documents[i], args.where)) {
                this.updateByIndex(i, args.data)
            }
        }
    }

    private updateByIndex(index: number, data: UpdateArgsDefault<Model>) {
        this.documents[index] = {
            ...this.documents[index],
            ...data
        }
    }

    private findIndex(args: QueryArgs<Model>) {
        return this.documents.findIndex(doc => this.validDocQuery(doc, args))
    }

    findAll() {
        return [...this.documents] as Model[]
    }

    findFirst(args: QueryArgs<Model>) {
        return ({ ...this.documents.find(doc => this.validDocQuery(doc, args)) } || null) as Model | null
    }

    findMany(args: QueryArgs<Model>) {
        return [...this.documents.filter(doc => this.validDocQuery(doc, args))] as Model[]
    }

    findManyOR(args: QueryArgs<Model>[]) {
        return this.findManyOperator(args, 'OR')
    }

    findManyAND(args: QueryArgs<Model>[]) {
        return this.findManyOperator(args, 'AND')
    }

    private findManyOperator(args: QueryArgs<Model>[], operator: 'OR' | 'AND') {
        const isOR = operator == 'OR'

        return [
            ...this.documents.filter(doc => {
                for (let i = 0; i < args.length; i++) {
                    const arg = args[i]

                    if (this.validDocQuery(doc, arg)) {
                        if (isOR) {
                            return true
                        }
                    } else {
                        if (!isOR) {
                            return false
                        }
                    }
                }

                return !isOR
            })
        ] as Model[]
    }

    private validDocQuery(doc: Model, query: QueryArgs<Model>) {
        for (const argKey in query) {
            const arg = query[argKey]
            const docArg = doc[argKey]

            if (typeof docArg == 'undefined') {
                continue
            }

            if (typeof arg == 'object') {
                if (!this.validDocQuery(docArg, arg)) {
                    return false
                }
            } else {
                if (docArg != arg) {
                    return false
                }
            }
        }

        return true
    }
}
