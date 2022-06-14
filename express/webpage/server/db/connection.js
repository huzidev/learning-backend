const mongoose = require('mongoose');
// NOT NECESSARY TO PROVIDE PATH HERE IF WE'VE ALREADY IN APP.JS
const DB = process.env.DATA; //DATA name of variable we've created

mongoose.connect(DB, {
    useNewUrlParser : true,
    // useCreateIndex : true,
    useUnifiedTopology : true,
    // useFindAndModify : false
}).then(() => { //since it is promise, we use (then) for success
    console.log("Connection Successful");
}).catch((err) => {
    console.log("No Connection");
});