export interface User {
    id: number
    name: string
}

export interface Types {
    loading: boolean
    users: User[]
    error: string
}