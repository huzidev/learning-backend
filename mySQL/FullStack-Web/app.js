import express from "express";
import cors from "cors";

const server = express();
const port = 8000;


//middleware
server.use(express.json());
server.use(express.urlencoded({extended : true}))

//routers
import routerProduct from './routes/productRouter'
import routerReview from './routes/reviewRouter'
server.use('/api/products', routerProduct) // /api/products will just get at the start then we can go to any route we wanted 
server.use('/api/reviews', routerReview)

// STATIC Images Folder
server.use('/Images', express.static('./Images')) // since images is an STATIC folder and it is mandatory to use

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