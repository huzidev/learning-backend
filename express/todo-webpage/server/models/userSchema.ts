import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    isTheme: {
        type : Boolean,
    },
    image : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
});

// HASHING
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// GENERATING TOKEN
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ 
            _id : this._id 
        }, 
            process.env.SECRET_KEY!
        );
        // concatenation of token inside tokens array we've created in schema
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

const User = mongoose.model("users", userSchema);

module.exports = User;