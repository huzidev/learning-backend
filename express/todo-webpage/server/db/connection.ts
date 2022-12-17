import mongoose, { ConnectOptions } from "mongoose";
const DB = process.env.DATA!;

try {
    mongoose.connect(DB, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    } as ConnectOptions)
} catch (error) {
    console.log("Error" + error);
}