import express from "express";
import Verification from '../middleware/Verification';
import Note from '../models/Note';
import { body, validationResult } from 'express-validator';
 
const router = express.Router();

router.get('/allnotes', Verification, (req, res) => {
    try {
        
    } catch (e) {
        console.log(e);
    }
})