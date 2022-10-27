import express from "express";
import bcrypt from "bcrypt";
const { v4: uuidv4 } = require('uuid');
import multer from "multer";
import User from '../models/userSchema';
import Contact from '../models/userMessage';
import Verification from '../middleware/Verification';
import cookie from 'cookie-parser';
import cors from "cors";
import path from 'path';

require('../db/connection.js');

const router = express.Router();

router.use(cors({
    origin: "*"
}));

router.use(express.urlencoded({ extended : false }));
router.use(cookie());

router.post('/', (req, res) => {
    res.send("Home page");
})

router.post('/signup', async (req, res) => {
    const { username, email, number, password, cpassword, image } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(421).json({ error : "You've left an tag empty" });
    }
    try {
        const emailExist = await User.findOne({ email : email });
        const usernameExist = await User.findOne({ username : username });
        const numberExist = await User.findOne({ number : number });

        if (emailExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (usernameExist) {
            return res.status(423).json({ error: "Username already Exist" });
        } else if (numberExist) {
            return res.status(424).json({ error: "Number already Exist" });
        } else if (password !== cpassword) {
            return res.status(425).json({ error : "Password doesn't match" });
        } else if (username.length < 2) {
            return res.status(426).json({ error : "Username's length must be greater than 2 characters" });
        } else if (password.length < 2 || cpassword.length < 2) {
            return res.status(427).json({ error : "Password's length must be greater than 2 characters" });
        } 
        // when user registered successfully
        else {
            const user = new User({ username, email, number, password, cpassword, image });
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

router.post('/signin', async (req, res) => {
    try {
        let token;
        const {email, username, number, password} = req.body;
        const userEmail = await User.findOne({ email: email });
        const userName = await User.findOne({ username: username });
        const userNumber = await User.findOne({ number: number });
        if (userEmail) {
            const isMatchEmail = await bcrypt.compare(password, userEmail.password);

            token = await userEmail.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 86400000),
                httpOnly : true
            })
            if (!isMatchEmail) {
                res.status(400).json({ error : "Email or Password is incorrect" })
            }
            else if (isMatchEmail) {
                res.status(201).json({ message : "User loggedIn successfully" })
            }
            else {
                res.status(500).json({ message : "Internal Server Error : Failed to registered!" })
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/contact', async (req, res) => {
    
    try{
        const { username, email, number, message } = req.body;

        if (!username) {
            return res.status(422).json({ error : "Username must be provide" });
        } else if (!email) {
            return res.status(423).json({ error : "Email must be provide" });
        } else if (!message) {
            return res.status(424).json({ error : "Mesasge field is empty" });
        }
        const userMessage = new Contact({ username, email, number, message })
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

router.put('/updateuser/:id', Verification, async (req, res) => {
    const { username, email, number } = req.body;

    try {
        
        const newInfo = {}
        if (username) {
            newInfo.username = username
        } 
        if (email) {
            newInfo.email = email
        } 
        if (number) {
            newInfo.number = number
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


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('image'), async (req, res) => {
    const image = req.file.filename;

    const newUserData = {
        image
    }

    const newUser = new User(newUserData);

    const upload = await newUser.save()

    res.json(upload)
});

router.get('/about', Verification, (req, res) => {
    res.send(req.userInfo)
})

router.get('/signout', (req, res) => {
    res.clearCookie('jwtoken', { path : '/' })
    res.status(200).send("User loggedOut Successfully!")
})

module.exports = router;