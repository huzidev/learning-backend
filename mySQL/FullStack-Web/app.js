import express from "express";
import cors from "cors";

const server = express();
const port = 8000;

var corOptions = {
    origin : '127.0.0.1:8001'
}


//middleware
server.use(cors(corOptions));
server.use(express.json());
server.use(express.urlencoded({extended : true}))

//routers
import routerProduct from './routes/productRouter'
import routerReview from './routes/reviewRouter'
server.use('/api/products', router) // /api/products will just get at the start then we can go to any route we wanted 

server.get('/', (req, res) => {
    res.json({ message : "Hello From API" });
});

server.listen(port, (err) => {
    if (!err) {
        console.log(`Server listening on port ${port}`);
    }
    else{
        console.log(err);
    }
});