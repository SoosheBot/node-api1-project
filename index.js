// implement your API here
const express = require('express');
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get('/api/users', (req,res) => {
    db.find()
    .then(user => {
        console.log('users found', user);
        res.status(201).json(user);
    })
    .catch(err => {
        console.log('GET error', err);
        res.status(500).json({ errorMessage: 'ope!'})
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));