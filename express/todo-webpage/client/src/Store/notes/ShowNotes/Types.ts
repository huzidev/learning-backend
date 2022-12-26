export interface Note {
    _id: number
    title: string
    description: string
    category: string
    isCompleted: boolean
}

export interface InitialType {
    noteData: Note[]
}