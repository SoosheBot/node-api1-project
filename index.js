// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

//POST
server.post("/api/users", (req, res) => {
  const users = { ...req.body };

  db.insert(users)
    .then(user => {
      if (user) {
        // console.log("POST success! User is", user);
        res.status(201).json(user);
      } else {
        // console.log("POST error", err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      }
    })
    .catch(err => {
      console.log("POST error--missing user name or bio", err);
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    });
});

//GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      console.log("GET success! Users found", users);
      res.status(201).json(users);
    })
    .catch(err => {
      console.log("GET error", err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//GET by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      if (users) {
        console.log("GET by id success! User found", users);
        res.status(201).json(users);
      } else {
        console.log("GET error", err);
        res.status(500).json({
          errorMessage: "The user's information could not be retrieved."
        });
      }
    })
    .catch(err => {
      console.log("GET by ID error", err);
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

//DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(users => {
      if (users) {
        console.log("User deleted at ID #", users);
        res.status(201).json(users);
      } else {
        console.log("DELETE error", err);
        res.status(500).json({
          errorMessage: "The user's information could not be removed."
        });
      }
    })
    .catch(err => {
      console.log("DELETE err", err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
