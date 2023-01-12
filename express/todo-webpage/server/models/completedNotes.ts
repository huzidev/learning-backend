import mongoose from "mongoose";
const { Schema } = mongoose;

const NotesSchema = new Schema({
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
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    isCompleted : {
        type: Boolean
    }
});

const CompletedNotes = mongoose.model('NOTES_COMPLETED', NotesSchema);

module.exports = CompletedNotes;