export interface DataType {
    id: string,
    title: string,
    description: string,
    category: string,
    isChecked: boolean | null
}
export interface DataTypeHold {
    hid: number | null,
    htitle: string,
    hdescription: string,
    hcategory: string
    hIsCompleted: boolean | undefined
}