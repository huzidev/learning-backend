import mongoose, { ConnectOptions } from "mongoose";
const DB = process.env.DATA!;

mongoose.connect(DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}as ConnectOptions).then(() => {
    console.log("Connection Successful!");
}).catch((err) => {
    console.log("Failed To Connect", err);
})