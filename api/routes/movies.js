const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/movie");
const checkAuth = require("../middleware/check_auth");

router.get("/", checkAuth, (request, response, next) => {
  Movie.find({})
    .exec()
    .then((movies) => {
      return response.status(200).json({
        movies: movies,
      });
    })
    .catch((error) => {
      return response.status(500).json({
        error: error,
      });
    });
});

router.post("/", checkAuth, (request, response, next) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    releaseDate: request.body.releaseDate,
    genre: request.body.genre,
    rating: request.body.rating,
    description: request.body.description,
  });

  movie.save()
    .then((result) => {
      response.status(201).json({
        message: "The movie was successfully Register.",
        movie: result,
      });
    })
    .catch((error) => {
      response.status(400).json({ error: error });
    });
});

router.get("/:movieId", checkAuth, (request, response, next) => {
    console.log(request.params.movieId)
  const id = request.params.movieId;

  Movie.findById(id)
    .exec()
    .then((movie) => {
      return response.status(200).json(movie);
    })
    .catch((error) => {
      return response.status(500).json({ error: error });
    });
});

router.delete("/:movieId", checkAuth, (request, response, next) => {
  const id = request.params.movieId;
  Movie.remove({ _id: id })
    .exec()
    .then((result) => {
      response.status(200).json({
        message: "Movie deleted successful",
      });
    })
    .catch((error) => {
      return response.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
