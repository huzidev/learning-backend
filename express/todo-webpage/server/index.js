import express from "express";
import dotenv from "dotenv";
dotenv.config({ path : './config.env' });

const server = express();
const port = 8000;

server.use(express.json());
server.use(require())

server.get('/', (req, res) => {
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