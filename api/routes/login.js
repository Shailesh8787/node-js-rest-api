const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/", (request, response, next) => {
  User.find({ email: request.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return response.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(
        request.body.password,
        user[0].password,
        (error, result) => {
          if (error) {
            return response.status(401).json({
              message: "Auth failed"
            });
          }

          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                id: user[0]._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return response.status(200).json({
              message: "Auth successful",
              data: {
                id: user[0]._id,
                token: token
              }
            });
          }

          return response.status(401).json({
            message: "Auth failed"
          });
        }
      );
    })
    .catch(error => {
      return response.status(500).json({
        error: error
      });
    });
});

module.exports = router;
