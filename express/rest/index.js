const express = require('express');

const db = require('./db');

const server = express(); // will create express application OR starts ours server

const port = 8000;

const bodyParser = require('body-parser');

server.get('/', (req, res) => {
    res.send({message: 'hello world'});
})

server.get('/products', (req, res) => {
    res.send({ list: db.getProducts() });
})

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
})

server.get('/products/search', (req, res) => {// ? means start of query string (means) specific item's info
    const { name } = req.query;
    console.log(name, 'name');
    const products = db.getProducts().filter(((product) => product.name.includes(name)));
    // we've haven't used find here because we don't want ID rather we want name(info)
    if (!products.length) {
        res.status(404).send({ message: `No product found with name ${name}`});
        return;
    }
    res.send({ products });
})

server.get('./products/body', (req, res) => {

})

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});