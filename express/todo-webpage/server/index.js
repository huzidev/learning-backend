import express from "express";

const server = express();
const port = 8000;

server.post('/', (req, res) => {
    res.send("Hello, World");
})

server.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.log(err);
    }
})