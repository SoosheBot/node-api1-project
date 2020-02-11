// implement your API here
const express = require("express");
const cors = require("cors");
const db = require("./data/db");

const server = express();
server.use(express.json());
server.use(cors());

//POST
server.post("/api/users", (req, res) => {
  const users = { ...req.body };
  if (!users.name || !users.bio) {
    console.log("POST error--missing user name or bio");
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(users)
      .then(user => {
        console.log("POST success! User =", user);
        res.status(201).json(user);
      })
      .catch(err => {
        console.log("POST error", err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

//GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      if (!users) {
        console.log("no users");
        res.status(404).json({ message: "No users found" });
      } else {
        console.log("GET success! Users found", users);
        res.status(201).json(users);
      }
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
      if (users.id) {
        console.log("GET by id success! User found", users);
        res.status(201).json(users);
      } else {
        console.log("GET by ID error", err);
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("GET error", err);
      res.status(500).json({
        errorMessage: "The user's information could not be retrieved."
      });
    });
});

//DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(users => {
      if (!users) {
        res.status(404).json({ message: "ID does not exist" });
        // } else if () {
        //   console.log("DELETE error");
        //   res.status(500).json({
        //     errorMessage: "The user's information could not be removed."
        //   })
      } else {
        console.log(`User ID #${id} has been removed`);
        res.status(201).json(users);
      }
    })
    .catch(err => {
      console.log("DELETE err", err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// PUT
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const users = { ...req.body };

  if (!users.name || !users.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(id, users)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
