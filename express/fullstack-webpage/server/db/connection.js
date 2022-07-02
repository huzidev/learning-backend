import mongoose from "mongoose";

const DB = process.env.DATA

mongoose.connect(DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    console.log("Connection Successful!");
}).catch((err) => {
    console.log("Failed To Connect", err);
})