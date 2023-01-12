export interface DataType {
    id: string,
    title: string,
    description: string,
    date: any,
    category: string,
    isCompleted: boolean | null
}
export interface DataTypeHold {
    hid: number | null,
    htitle: string,
    hdescription: string,
    hcategory: string
    hIsCompleted: boolean | undefined
}