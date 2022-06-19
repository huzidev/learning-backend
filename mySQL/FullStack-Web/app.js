import express from "express";
import cors from "cors";

const server = express();
const port = 8000;

var corOptions = {
    origin : '127.0.0.1:8000'
}

server.use(cors(corOptions));
server.use(express.json());

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