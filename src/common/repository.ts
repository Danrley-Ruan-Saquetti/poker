type RepositoryModel = {
    id: number
}

export class Repository<Model extends RepositoryModel> {
    protected documents: Model[]
    private lastIndex: number

    constructor() {
        this.lastIndex = 0
        this.documents = []
    }

    add(doc: Omit<Model, 'id'>) {
        this.lastIndex++

        const id = this.lastIndex

        const data = { ...doc, id } as Model

        this.documents.push(data)

        return data
    }

    removeById(id: number) {
        const index = this.findIndexById(id)

        if (index < 0) { return }

        this.documents.splice(index, 1)
    }

    updateByIndex(id: number, data: Partial<Omit<Model, 'id'>>) {
        const index = this.findIndexById(id)

        if (index < 0) { return }

        this.documents[index] = {
            ...this.documents[index],
            ...data
        }
    }

    findIndexById(id: number) {
        return this.documents.findIndex(doc => doc.id == id)
    }

    findMany(args: Partial<Model>) {
        return this.documents.filter(doc => this.validDocArgs(doc, args))
    }

    findManyWithOr(argsOr: Partial<Model>[]) {
        return this.documents.filter(doc => {
            for (let i = 0; i < argsOr.length; i++) {
                const args = argsOr[i]

                if (this.validDocArgs(doc, args)) {
                    return true
                }
            }

            return false
        })
    }

    private validDocArgs(doc: Model, args: Partial<Model>) {
        if (!Object.keys(args).length) { return false }

        for (const argKey in args) {
            const arg = args[argKey]
            const docArg = doc[argKey]

            if (typeof docArg == 'undefined') { continue }

            if (docArg != arg) { return false }
        }

        return true
    }

    findFirst(args: Partial<Model>) {
        return this.documents.find(doc => {
            for (const argKey in args) {
                const arg = args[argKey]
                const docArg = doc[argKey]

                if (typeof docArg == 'undefined') { continue }

                if (docArg != arg) { return false }
            }

            return true
        }) || null
    }

    findById(id: number) {
        return this.documents.find(doc => doc.id == id) || null
    }

    findAll() {
        return this.documents
    }
}
