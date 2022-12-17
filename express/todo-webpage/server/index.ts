import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookie from 'cookie-parser';
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({ path : './config.env' });
require('./db/connection.js');

const server = express();
const port: number = 8000;

server.use(express.json());
server.use(require('./router/auth'));
server.use(require('./router/notes'));

server.use(cors({
    origin: "*"
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));
server.use(cookie());

server.get('*', (req: Request, res: Response) => {
    res.send({ message: "Hello, world" });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});