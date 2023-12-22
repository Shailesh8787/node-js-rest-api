const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Theatre = require("../models/theatre");
const checkAuth = require("../middleware/check_auth");

router.get("/", checkAuth, (request, response, next) => {
    Theatre.find({})
    .exec()
    .then((theatre) => {
      return response.status(200).json({
        theatre: theatre,
      });
    })
    .catch((error) => {
      return response.status(500).json({
        error: error,
      });
    });
});

router.post("/", checkAuth, (request, response, next) => {
  const theatre = new Theatre({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    location: request.body.location,
    seats: request.body.seats,
    description: request.body.description,
  });

  theatre.save()
    .then((result) => {
      response.status(201).json({
        message: "The theatre was successfully Register.",
        movie: result,
      });
    })
    .catch((error) => {
      response.status(400).json({ error: error });
    });
});

router.get("/:theatreId", checkAuth, (request, response, next) => {
  const id = request.params.theatreId;

  Theatre.findById(id)
    .exec()
    .then((theatre) => {
      return response.status(200).json(theatre);
    })
    .catch((error) => {
      return response.status(500).json({ error: error });
    });
});

router.delete("/:theatreId", checkAuth, (request, response, next) => {
  const id = request.params.theatreId;
  Theatre.remove({ _id: id })
    .exec()
    .then((result) => {
      response.status(200).json({
        message: "Theatre deleted successful",
      });
    })
    .catch((error) => {
      return response.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
