import mongoose from "mongoose";
const { Schema } = mongoose;

const userMessage = new Schema({
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
        default : Date.now
    }
});

const Contact = mongoose.model('TODO-USERS-MESSAGES', userMessage); 

export default Contact;