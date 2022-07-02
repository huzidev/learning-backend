import express from 'express';

const server = express();
const port = 8000;

server.use(express.json());
server.use(express.urlencoded({extended : true}));

// main work
server.get('/', (req, res) => {
    res.json({ message : 'hello' });
});

// running on port
server.listen(port, (err) => {
    if (!err) {
        console.log(`Server Listening On Port ${port}`);        
    }
    else {
        console.log(err);
    }
});