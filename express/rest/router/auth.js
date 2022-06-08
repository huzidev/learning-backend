const express = require('express');
const router = express.Router();
// since we are not in app.js the main file, therefore we've to use (router) instead of (server)

router.get('/', (req, res) => {
    res.send({ message: 'hello world App.js' });
});