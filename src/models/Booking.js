const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  showtime: Date,
  numberOfTickets: Number,
  confirmationCode: String,
  paid: {
    type: Boolean,
    default: false
  },
   amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);