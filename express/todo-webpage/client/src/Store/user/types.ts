export interface User {
    _id: number
    username: string
    email: string
    number: number
    isTheme: boolean
}

export interface initialType {
    loading: boolean
    users: User[]
    error: string
}