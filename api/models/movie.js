const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: {type: String},
  rating: { type: Number },
  description: { type: String }
});

module.exports = mongoose.model("movie", movieSchema);
