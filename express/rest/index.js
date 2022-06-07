const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');

const server = express(); // will create express application OR starts ours server
const port = 8000;

const DB = "mongodb+srv://Huzaifa:huzaifa123@cluster0.ldakh6i.mongodb.net/backend-learning?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => { //since it is promise, we use then for success
    console.log("Connection Successful");
}).catch((err) => console.log("No Connection"));

server.set('view engine', 'pug');
server.set('views', './views');

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send({ message: 'hello world' });
});

server.get('/products', (req, res) => {
    res.send({ list: db.getProducts() });
});

server.get('/data', (req, res) => {
    res.send({ userData : data.data() });
});

server.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    console.log(productId, "is the product's Id");
    const product = db.getProducts().find(((product) => product.id === parseInt(productId) ));
    // necessary to use parseINT to convert stringify int to simple int
    if (!product) {
        res.status(404).send({ message: 'product not found'});
        return;
    }
    res.send({ product });
});

server.get('/products/search', (req, res) => {// ? means start of query string (means) specific item's info
    const { name } = req.query;//we uses (req) when we wanted to read data which came to server 
    console.log(name, 'name');
    const products = db.getProducts().filter(((product) => product.name.includes(name)));
    // we've haven't used find here because we don't want ID rather we want name(info)
    if (!products.length) {
        res.status(404).send({ message: `No product found with name ${name}`});
        return;
    }
    res.send({ products });
});

//Registration page
server.get('/register', (req, res) => {
    res.render('register');
});

// if we uses submit="GET"
server.get('/form', (req, res) => {
    const temp = JSON.parse(JSON.stringify(req.query));
    res.render('form', {
        "data" : temp
    });
});

// if we uses submit="POST"
// make sure to put urlencoded as TRUE
server.post('/form', (req, res) => {
    console.log(req.body);
    res.render('form', {
        data : req.body
    });
});

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});