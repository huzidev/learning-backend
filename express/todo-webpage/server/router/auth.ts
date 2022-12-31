import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
// import multer from "multer";
const Verification = require("../middleware/Verification")
const Contact = require("../models/userMessage")
const User = require("../models/userSchema")
import TypesUser from './Types';
import cookie from 'cookie-parser';
import cors from "cors";

require('../db/connection.ts');

const router = express.Router();

router.use(cors({
    origin: "*"
}));

router.use(express.urlencoded({ extended : false }));
router.use(cookie());

router.post('/', (req: any, res: Response) => {
    res.send("Home page");
})

router.post('/signup', async (req: any, res: Response) => {
    const { username, email, number, password, cpassword, isTheme } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(421).json({ error : "You've left an tag empty" });
    }
    try {
        const emailExist = await User.findOne({ email : email });
        const usernameExist = await User.findOne({ username : username });
        const numberExist = await User.findOne({ number : number });
        if (usernameExist) {
            return res.status(422).json({ error: "Username already Exist" });
        } else if (emailExist) {
            return res.status(423).json({ error: "Email already Exist" });
        } else if (numberExist) {
            return res.status(424).json({ error: "Number already Exist" });
        } else if (password !== cpassword) {
            return res.status(425).json({ error : "Password doesn't match" });
        } else if (username.length < 3) {
            return res.status(426).json({ error : "Username must be 3 characters Long" });
        } else if (password.length || cpassword.length < 6) {
            return res.status(427).json({ error : "Password must be 6 characters Long" });
        } 
        // when user registered successfully
        else {
            const user = new User({ username, email, number: "+92" + number, password, cpassword, isTheme });
            const userRegister = await user.save();
            if (userRegister) {
                return res.status(201).json({ message : "User registered successfully!" });
            } else {
                return res.status(500).json({ message : "Failed to registered" });
            }
        }
    } catch (err) {
        console.log(err);
    }
})


router.post('/signin', async (req: any, res: Response) => {
    try {
        let token: string;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(421).json({ error : "You've left an tag empty" });
        }
        const userEmail: any = await User.findOne({ email: email });
        if (!userEmail) {
            return res.status(422).json({ error: "No Such Email is Found!" })
        } else if (userEmail) {
            const isMatchPassword = await bcrypt.compare(password, userEmail.password);
            if (!isMatchPassword) {
                return res.status(423).json({ error : "Password is incorrect" })
            } else {
                token = await userEmail.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires : new Date(Date.now() + 86400000), // after 24 hours
                    httpOnly : true
                })
                return res.status(201).json({ message : "User loggedIn successfully" })
            }
        } else {
            return res.status(500).json({ message : "Internal Server Error : Failed to registered!" })
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/contact', async (req: any, res: Response) => {
    
    try{
        const { username, email, number, message } = req.body;
        
        if (!username) {
            return res.status(422).json({ error : "Username must be provide" });
        } else if (!email) {
            return res.status(423).json({ error : "Email must be provide" });
        } else if (!message) {
            return res.status(424).json({ error : "Mesasge field is empty" });
        }
        const userMessage = new Contact({ username, email, number: number === null ? null : "+92" + number , message })
        const userResponse = await userMessage.save();
        
        if (userResponse) {
            return res.status(200).json({ message : "Message Sent Successfully!" });
        }
        else {
            return res.status(500).json({ error : "Failed To Send Message" });
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.put('/updateuser/:id', Verification, async (req: any, res: Response) => {
    const { username, email, number, isTheme } = req.body;
    try {
        const newInfo = <TypesUser>{}
        if (username) {
            newInfo.username = username
        } 
        if (email) {    
            newInfo.email = email
        } 
        if (number) {
            newInfo.number = number
        } 
        if (!isTheme || isTheme) {
            newInfo.isTheme = isTheme
        }
        let info = await User.findById(req.params.id);
        console.log("what is info", info);
        if (!info) {
            return res.status(404).json({ error: "Not Found" })
        }
        info = await User.findByIdAndUpdate(
            req.params.id,
            { $set: newInfo },
            { new: true }
        )
        res.json({ info });
    } catch (e) {
        console.log(e);
    }
})

router.get('/signout', (req: any, res: Response) => {
    res.clearCookie('jwtoken', { path : '/' })
    res.status(200).send("User loggedOut Successfully!")
})

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../../client/public/uploads")
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// router.post('/addimage', upload.single("image"), (req, res) => {
//     const newData = new User({
//         image: req.file.originalname
//     })
//     newData
//     .save()
//     .then(() => res.json("Image Uploaded"))
//     .catch((e) => res.status(400).json(`Error: ${e}`))
// })

router.get('/about', Verification, (req: any, res: Response) => {
    return res.json(req.userInfo)
})

module.exports = router;