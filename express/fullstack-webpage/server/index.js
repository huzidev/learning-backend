import express from 'express';
import dotenv from 'dotenv';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser'; // for form management
import routerProduct from './router/productRouter';
import routerReview from './router/reviewRouter';
import cors from "cors";

dotenv.config({ path : './config.env' }) // so password for mongoDB will remains UNKNOWN as we'll put the config file in .gitignore
require('./db/connection.js');


// server configurations
const server = express();
const port = 8000;


// link with router
server.use(express.json());
server.use(require('./router/auth'));


server.use(cors({
    origin: '*' 
}))

// form management
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));


// from mysql database
server.use('/api/products', routerProduct)
server.use('/api/reviews', routerReview)
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