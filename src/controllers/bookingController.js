const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const generateCode = require("../utils/generateCode");

const PRICE_PER_TICKET = 150;

const createBooking = async (req, res) => {
  try {
    const { movieId, showtime, numberOfTickets, amount } = req.body;

   
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }


    const tickets = Number(numberOfTickets);
    if (!tickets || tickets <= 0) {
      return res.status(400).json({ message: "Invalid ticket count" });
    }

  
    const bookings = await Booking.find({ movieId, showtime });

    const alreadyBooked = bookings.reduce(
      (sum, b) => sum + b.numberOfTickets,
      0
    );

    if (alreadyBooked + tickets > movie.capacityPerShowtime) {
      return res.status(400).json({
        message: "Showtime is fully booked",
      });
    }

 
    const expectedAmount = tickets * PRICE_PER_TICKET;

    if (Number(amount) !== expectedAmount) {
      return res.status(400).json({
        message: "Invalid booking amount",
      });
    }

  
    const confirmationCode = generateCode();

   
    const booking = await Booking.create({
      ...req.body,
      numberOfTickets: tickets,
      amount: expectedAmount,
      confirmationCode,
      paid: true,
    });

    res.status(201).json({
      message: "Booking successful",
      confirmationCode,
      booking,
    });

  } catch (err) {
    console.error("Booking Error:", err);

    res.status(500).json({
      message: "Server error while booking",
    });
  }
};

module.exports = {
  createBooking,
};