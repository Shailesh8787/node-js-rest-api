const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const checkAuth = require("../middleware/check_auth");

router.get("/", checkAuth, (request, response, next) => {
  User.find({})
    .exec()
    .then(users => {
      return response.status(200).json({
        message: users
      });
    })
    .catch(error => {
      return response.status(500).json({
        error: error
      });
    });
});

router.post("/", checkAuth, (request, response, next) => {
  bcrypt.hash(request.body.password, 10, (error, hash) => {
    if (error) {
      return response.status(500).json({ error: error });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        email: request.body.email,
        role_id: 1,
        phone: request.body.phone,
        password: hash
      });

      user
        .save()
        .then(result => {
          response.status(201).json({
            message: "The user was successfully Register.",
            createUser: result
          });
        })
        .catch(error => {
          response.status(400).json({ error: error });
        });
    }
  });
});

router.get("/:userId", checkAuth, (request, response, next) => {
  const id = request.params.userId;

  User.findById(id)
    .exec()
    .then(users => {
      return response.status(200).json(users);
    })
    .catch(error => {
      return response.status(500).json({ error: error });
    });
});

router.delete("/:userId", checkAuth, (request, response, next) => {
  const id = request.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      response.status(200).json({
        message: "User deleted successful"
      });
    })
    .catch(error => {
      return response.status(500).json({
        error: error
      });
    });
});

module.exports = router;
