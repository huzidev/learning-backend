import express from "express";
const server = express();
const port = 8000;

// import bodyParser from "body-parser";

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended : true}))
// const router = express.Router();
// server.use(router);

server.get('/', (req, res) => {
    res.send('Home Page');
});

server.listen(port, (err) => {
    if (!err) {
        console.log(`Server listening on port ${port}`);
    }
    else{
        console.log(err);
    }
});