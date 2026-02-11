const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  poster: String,
  duration: Number,
  theater: String,
  availableShowtimes: [Date],
  capacityPerShowtime: {
    type: Number,
    default: 50
  }
});

module.exports = mongoose.model("Movie", movieSchema);
