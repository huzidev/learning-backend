import mongoose from "mongoose";
const DB = process.env.DATA;

mongoose.connect(DB, {
    useuseNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Connection Successfull");
}).catch((e) => {
    console.log("Error" + e);
});