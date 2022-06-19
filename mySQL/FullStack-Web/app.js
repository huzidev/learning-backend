import express from "express";
import cors from "cors";

const server = express();
const port = 8000;

var corOptions = {
    origin : '127.0.0.1:8001'
}

//routers

import router from './routes/productRouter'
server.use('/api/products', router)

//middleware
server.use(cors(corOptions));
server.use(express.json());
server.use(express.urlencoded({extended : true}))


server.get('/', (req, res) => {
    res.json({ message : "Hello Form API" });
});

server.listen(port, (err) => {
    if (!err) {
        console.log(`Server listening on port ${port}`);
    }
    else{
        console.log(err);
    }
});