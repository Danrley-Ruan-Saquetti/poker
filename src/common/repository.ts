import { deepClone, PartialDeep } from 'src/util'

export type RepositoryModel = { id: number }
export type ArgsDefault<Model extends RepositoryModel> = Omit<Model, 'id'>
export type CreateArgs<Model extends RepositoryModel> = { data: ArgsDefault<Model> }
export type CreateManyArgs<Model extends RepositoryModel> = { data: ArgsDefault<Model>[] }
export type QueryArgsDefault<Model extends RepositoryModel> = PartialDeep<Model>
export type QueryArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model> }
export type QueryManyArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model>[] }
export type DeleteArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model> }
export type DeleteManyArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model> }
export type UpdateArgsDefault<Model extends RepositoryModel> = PartialDeep<ArgsDefault<Model>>
export type UpdateArgs<Model extends RepositoryModel> = { where: QueryArgsDefault<Model>; data: UpdateArgsDefault<Model> }

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

        return deepClone({ ...data }) as Model
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
            if (this.validDocQuery(this.documents[i], args.where)) {
                this.documents.splice(i, 1)
            }
        }
    }

    update(args: UpdateArgs<Model>) {
        const index = this.findIndex(args)

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
        return this.documents.findIndex(doc => this.validDocQuery(doc, args.where))
    }

    findAll() {
        return deepClone([...this.documents]) as Model[]
    }

    findFirst(args: QueryArgs<Model>) {
        return (deepClone({ ...this.documents.find(doc => this.validDocQuery(doc, args.where)) }) || null) as Model | null
    }

    findMany(args: QueryArgs<Model>) {
        return deepClone([...this.documents.filter(doc => this.validDocQuery(doc, args.where))]) as Model[]
    }

    findManyOR(args: QueryManyArgs<Model>) {
        return this.findManyOperator(args, 'OR')
    }

    findManyAND(args: QueryManyArgs<Model>) {
        return this.findManyOperator(args, 'AND')
    }

    private findManyOperator(args: QueryManyArgs<Model>, operator: 'OR' | 'AND') {
        const isOR = operator == 'OR'

        const docs = this.documents.filter(doc => {
            for (let i = 0; i < args.where.length; i++) {
                const arg = args.where[i]

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

        return deepClone([...docs])
    }

    private validDocQuery(doc: Model, query: QueryArgsDefault<Model>) {
        for (const argKey in query) {
            const arg = query[argKey]
            const docArg = doc[argKey]

            if (typeof docArg == 'undefined') {
                continue
            }

            if (typeof arg == 'object') {
                // @ts-expect-error
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
