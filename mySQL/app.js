import express from "express";

const server = express();
const port = 8000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})