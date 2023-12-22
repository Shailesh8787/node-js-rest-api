const mongoose = require("mongoose");

const theatreSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  location: { type: String },
  seats: { type: String },
  description: { type: String }
});

module.exports = mongoose.model("theatre", theatreSchema);
