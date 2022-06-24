import express from "express";
import cors from "cors";

const server = express();
const port = 8000;


//middleware
server.use(cors({
    origin: '*'
}))
server.use(express.json());
server.use(express.urlencoded({extended : true}))

//routers
import routerProduct from './routes/productRouter'
// import routerReview from './routes/reviewRouter'
server.use('/api/products', routerProduct) // /api/products will just get at the start then we can go to any route we wanted 
// server.use('/api/reviews', routerReview)

// STATIC Images Folder
server.use('/images', express.static('images')) // since images is an STATIC folder and it is mandatory to use
// STATIC folder is the folder where we've to store all the files therefore here we've linked it with images folder 
// so all the images will save their in ours static folder AND we basically didn't upload images at database in ours 
// DATABASE we just uploads address of images not files with real size just address is stored in database and then it linked
// through server to show images

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