import mongoose from "mongoose";
const DB = process.env.DATA;

mongoose.connect(DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Connection Successfull");
}).catch((e) => {
    console.log("Error" + e);
});