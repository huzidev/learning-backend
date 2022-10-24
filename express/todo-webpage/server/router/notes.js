import express from "express";
import Verification from '../middleware/Verification';
import Note from '../models/Note';
import { body, validationResult } from 'express-validator';
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
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote', Verification, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], 
    async (req, res) => {
        try {
            const { title, description, category, isCompleted } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const note = new Note({
                title, description, category, isCompleted, user: req.userID
            })

            const savedNote = await note.save();

            res.json(savedNote)

        } catch (e) {
            console.log(e);
        }
    }
)

router.put('/updatenote/:id', Verification, async (req, res) => {
    const { title, description, category } = req.body;
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

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (note.user.toString() !== req.userID.toString()) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        )
        res.json({ note });

    } catch (e) {
        console.log(e);
    }
})

router.delete('/deletenote/:id', Verification, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" })
        }

        if (note.user.toString() !== req.userID.toString()) {
            return res.status(401).send("Not Allowed");
        }
        
        note = await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Note Deleted", note: note })
    } catch (e) {
        console.log(e);
    }
})

router.put('/completed/:id', Verification, async (req, res) => {
    const { isCompleted } = req.body;
    try {
        
        const newNote = {}
        if (isCompleted) {
            newNote.isCompleted = isCompleted
        } 

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (note.user.toString() !== req.userID.toString()) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        )
        res.json({ note });

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;