import express from 'express';
import dotenv from 'dotenv';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser'; // for form management

// connection with mongoDB
dotenv.config({ path : './config.env' }) // so password for mongoDB will remains UNKNOWN as we'll put the config file in .gitignore
require('./db/connection.js');


// server configurations
const server = express();
const port = 8000;


// link with router
server.use(express.json());
server.use(require('./router/auth'));


// form management
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));


// MIDDLEWARE
import Verification from './middleware/Verification';
server.use('/images', express.static('images'))
server.use(cookie());



// running on port
server.listen(port, (err) => {
    if (!err) {
        console.log(`Server Listening On Port ${port}`);        
    }
    else {
        console.log(err);
    }
});