require('./db/connection.js');
import express from "express";
import dotenv from "dotenv";
import cookie from 'cookie-parser';
import bodyParser from "body-parser";
import Verification from "./middleware/Verification";
import cors from "cors";

dotenv.config({ path : './config.env' });

const server = express();
const port = 8000;

server.use(express.json());
server.use(require('./router/auth'));

server.use(cors({
    origin: "*"
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));
server.use(cookie());

server.get('*', (req, res) => {
    res.send({ message: "Hello, world" });
});

server.listen(port, (e) => {
    if (!e) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.log(e);
    }
});