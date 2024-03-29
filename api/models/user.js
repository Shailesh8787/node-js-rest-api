const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  role_id: {type: Number},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phone: { type: Number, required: true },
  password: { type: String, required: true, select: true }
});

module.exports = mongoose.model("User", userSchema);
