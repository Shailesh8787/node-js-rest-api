const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/", (request, response, next) => {
  /*const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    email: request.body.email
  });*/

  return response.status(200).json({
    message: "Get All Users"
  });
});

router.post("/", (request, response, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    email: request.body.email
  });

  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
  response.status(201).json({
    message: "One new user created",
    createUser: user
  });
});

router.get("/:id", (request, response, next) => {
  const id = request.param.id;

  return response.status(200).json({
    message: "get user by id"
  });
});

router.delete("/:id", (request, response, next) => {
  return response.status(200).json({
    message: "delete users"
  });
});

module.exports = router;
