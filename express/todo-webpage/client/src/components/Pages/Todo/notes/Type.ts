export interface DataType {
    id: string,
    etitle: string,
    edescription: string,
    ecategory: string
}
export interface DataTypeHold {
    hid: number | null,
    htitle: string,
    hdescription: string,
    hcategory: string
    hIsCompleted: boolean | undefined
}