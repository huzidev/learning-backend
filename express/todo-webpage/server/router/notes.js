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
        
    }
])