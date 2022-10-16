import express from "express";
import Verification from '../middleware/Verification';
import Note from '../models/Note';
import { body, validationResult } from 'express-validator';
 
const router = express.Router();

router.get('/allnotes', Verification, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.body.id })
    } catch (e) {
        console.log(e);
    }
})