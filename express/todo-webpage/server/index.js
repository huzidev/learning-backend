import express from "express";

const server = express();
const port = 8000;

server.post('/test', (req, res) => {
    res.send("Hello, World");
})

server.listen(port, (e) => {
    if (!e) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.log(e);
    }
})