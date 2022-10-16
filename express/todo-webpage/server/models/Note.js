import mongoose, { model } from "mongoose";

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tittle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true, 
    },
    category: {
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('NOTES', NotesSchema);

module.exports = Note;