const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/", (request, response, next) => {
  // Check User allredy exists or not.
  User.find({ email: request.body.email })
    .exec()
    .then(isUser => {
      if (isUser.length >= 1) {
        return response.status(409).json({
          message: "This User allready exists"
        });
      } else {
        bcrypt.hash(request.body.password, 10, (error, hash) => {
          if (error) {
            return response.status(500).json({ error: error });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: request.body.name,
              email: request.body.email,
              role_id: request.body.role_id,
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
      }
    });
});

module.exports = router;
