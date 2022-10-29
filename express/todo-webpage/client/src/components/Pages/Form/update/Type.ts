export interface DataType {
    id: string 
    enumber: string, 
    eusername: string
    eemail: string 
    eimage: string
}

export interface DataTypeF extends DataType {
    number: string, 
    username: string
    email: string 
    image: string
}