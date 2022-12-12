import express from "express";
import Verification from '../middleware/Verification';
import Note from '../models/Note';
import CompletedNotes from '../models/CompletedNotes';
import cors from "cors";
 
const router = express.Router();

router.use(cors({
    origin: "*"
}));

router.get('/allnotes', Verification, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userID });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

router.get('/completednotes', Verification, async (req, res) => {
    try {
        const notes = await CompletedNotes.find({ user: req.userID });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote', Verification, async (req, res) => {
        try {
            const { title, description, category, isCompleted } = req.body;
            console.log("Title is", title);
            if (!title | !description | !category) {
                return res.status(404).json({ message: "You've left an tag empty" })
            } else {
                const note = new Note({
                    title, description, category, isCompleted, user: req.userID
                })
                const savedNote = await note.save();
                res.json(savedNote)
            }
        } catch (e) {
            console.log(e);
        }
    }
)

router.put('/updatenote/:id', Verification, async (req, res) => {
    const { title, description, category, isCompleted } = req.body;
    try {
        const newNote = {}
        if (title) {
            newNote.title = title
        } 
        if (description) {
            newNote.description = description
        } 
        if (category) {
            newNote.category = category
        }
        if (!isCompleted || isCompleted) {
            newNote.isCompleted = isCompleted
        }
        let note, savedNote, state, hold, main; 
        if (await Note.findById(req.params.id)) {
            main = Note,
            state = true,
            hold = CompletedNotes
        } else if (await CompletedNotes.findById(req.params.id)) {
            main = CompletedNotes,
            state = false,
            hold = Note
        }
        note = await main.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (note.user.toString() !== req.userID.toString()) {
            return res.status(401).send("Not Allowed");
        }
        if (isCompleted === state) {
            note = new hold({
                title, description, category, isCompleted, user: req.userID
            })
            savedNote = await note.save();
            note = await main.findById(req.params.id)
            if (note.user.toString() !== req.userID.toString()) {
                return res.status(401).send("Not Allowed");
            }
            note = await main.findByIdAndDelete(req.params.id);
        }
        note = await main.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        )
        res.json(savedNote)
        res.json({ note });
    } catch (e) {
        console.log(e);
    }
})

router.delete('/deletenote/:id', Verification, async (req, res) => {
    try {
        let note, main; 
        if (await Note.findById(req.params.id)) {
            main = Note
        } else if (await CompletedNotes.findById(req.params.id)) {
            main = CompletedNotes
        }
        note = await main.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (note.user.toString() !== req.userID.toString()) {
            return res.status(401).send("Not Allowed");
        }
        note = await main.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Note Deleted", note: note })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;