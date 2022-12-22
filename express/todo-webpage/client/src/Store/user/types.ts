export interface User {
    _id: number
    username: string
    email: string
    number: number
    isTheme: boolean
}

export interface InitialType {
    loading: boolean
    userData: User[]
    error: string
}