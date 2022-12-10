export interface DataType {
    id: string,
    etitle: string,
    edescription: string,
    ecategory: string
}
export interface DataTypeHold {
    htitle: string,
    hdescription: string,
    hcategory: string
    hisCompleted: boolean | null
}