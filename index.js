// implement your API here
const express = require('express');
const db = require("./data/db");

const server = express();
server.use(express.json());

//GET
server.get('/api/users', (req,res) => {
    db.find()
    .then(users => {
        console.log('users found', users);
        res.status(201).json(users);
    })
    .catch(err => {
        console.log('GET error', err);
        res.status(500).json({ errorMessage: 'ope!'})
    });
});

//POST
server.post('/api/users', (req,res) => {
    const dbInfo = req.body;
    console.log("body", req.body);

    db.insert(dbInfo).then(user => {
        console.log("user is", user);
        res.status(201).json(user);
    })
    .catch(err => {
        console.log('GET error', err);
        res.status(400).json({ errorMessage: 'ope! Add the username and bio'})
    });
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));