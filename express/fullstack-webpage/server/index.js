import express from 'express';
import dotenv from 'dotenv';

// connection with mongoDB
dotenv.config({ path : './config.env' }) // so password for mongoDB will remains UNKNOWN as we'll put the config file in .gitignore
require('./db/connection.js');


// server configurations
const server = express();
const port = 8000;


// link with router
server.use(require('./router/auth'));


server.use(express.json());
server.use(express.urlencoded({extended : true}));



// running on port
server.listen(port, (err) => {
    if (!err) {
        console.log(`Server Listening On Port ${port}`);        
    }
    else {
        console.log(err);
    }
});