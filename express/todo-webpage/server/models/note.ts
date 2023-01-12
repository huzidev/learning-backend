import mongoose from "mongoose";
const { Schema } = mongoose;

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
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
    isCompleted: {
        type: Boolean
    },
    date:{ 
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('NOTES', NotesSchema);

module.exports = Note;