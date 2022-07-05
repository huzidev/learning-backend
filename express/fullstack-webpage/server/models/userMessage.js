import mongoose from 'mongoose';

const userMessage = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : Number,
    },
    message : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now // no need for using () for date.now()
    }
})

const Contact = mongoose.model("USER-REDUX-MESSAGES", userMessage);

export default Contact;