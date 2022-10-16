import express from "express";
import Verification from '../middleware/Verification';
import Note from '../models/Note';
import { body, validationResult } from 'express-validator';
 
const router = express.Router();

router.get('/allnotes', Verification, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.body.id })
        if (notes) {
            return res.status(200).json(notes)
        } else {
            return res.status(500).json({ message : "Internal Server Error" });
        }
        res.json(notes)
    } catch (e) {
        console.log(e);
    }
})

router.post('/addnote', Verification, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], 
    async (req, res) => {
        try {
            const { title, description, category } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const note = new Note({
                title, description, category, user: req.user.id
            })

            const savedNote = await note.save();

            if (savedNote) {
                return res.status(200).json(savedNote)
            } else {
                return res.status(500).json({ message : "Internal Server Error" });
            }

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
        } else if (description) {
            newNote.description = description
        } else if (category) {
            newNote.category = category
        }

        let note = await Note.findBy(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Allowed" })
        }

    } catch (e) {
        console.log(e);
    }
})