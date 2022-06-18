import express from "express";
import ('./models');// import sequelize


const server = express();
const port = 8000;

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