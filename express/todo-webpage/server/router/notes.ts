import express, { Request, Response } from "express";
const Verification = require("../middleware/Verification")
const CompletedNotes = require("../models/completedNotes")
const Note = require("../models/note")
import cors from "cors";
import TypesNote from './Types';
 
const router = express.Router();

router.use(cors({
    origin: "*"
}));


// let path: string, holder: any;
// if (location.pathname.includes("/addnote")) {
//     path = "/allnotes";
//     holder = Note;
// } else if (location.pathname.includes("/completed")) {
//     path = "/completednotes";
//     holder = CompletedNotes;
// }

// router.get(`${path!}`, Verification, async (req: any, res: Response) => {
//     try {
//         const notes = await holder.find({ user: req.userID });
//         res.json(notes)
//     } catch (err) {  
//         // because error type will be unkown therefore just check if error is of instance error
//         if (err instanceof Error) {
//             console.error(err.message);
//         } else {
//             console.error(String(err))
//         }
//         return res.status(500).send("Internal Server Error");
//     }
// })

router.get('/allnotes', Verification, async (req: any, res) => {
    try {
        if (req.path.includes('mystring')) {
            res.send('The current pathname includes "mystring"');
        }
        const notes = await Note.find({ user: req.userID });
        res.json(notes)
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(String(err))
        }
        return res.status(500).send("Internal Server Error");
    }
})

router.get('/completednotes', Verification, async (req: any, res) => {
    try {
        const notes = await CompletedNotes.find({ user: req.userID });
        res.json(notes)
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(String(err))
        }
        return res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote', Verification, async (req: any, res: Response) => {
        try {
            const { title, description, category, isCompleted } = req.body;
            console.log("Title is", title);
            if (!title || !description || !category) {
                return res.status(404).json({ message: "You've left an tag empty" })
            } else {
                const note = new Note({
                    title, description, category, isCompleted, user: req.userID
                })
                const savedNote = await note.save();
                res.json(savedNote)
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(String(err))
            }
            return res.status(500).send("Internal Server Error");
        }
    }
)

router.put('/updatenote/:id', Verification, async (req: any, res: Response) => {
    const { title, description, category, isCompleted } = req.body;
    try {
        const newNote = <TypesNote>{}
        if (title) {
            newNote.title = title
        } else if (description) {
            newNote.description = description
        } else if (category) {
            newNote.category = category
        } else if (!isCompleted || isCompleted) {
            newNote.isCompleted = isCompleted
        }
        let note: any, savedNote: any, state: any, hold: any, main: any; 
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
            // ex: if note is changed to completed from inCompleted then delete that note from allnotes table and add it to completedNotes table
            note = await main.findByIdAndDelete(req.params.id);
        }
        note = await main.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        )
        res.json({ note, savedNote });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(String(err))
        }
        return res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletenote/:id', Verification, async (req: any, res: Response) => {
    try {
        let note: any, main: any; 
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
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(String(err))
        }
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;