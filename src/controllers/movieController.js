const Movie = require("../models/Movie");
const Booking=require("../models/Booking");

const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


const getMovies = async (req, res) => {
try{
    const movies = await Movie.find();
    res.json(movies);

}   
catch(err){
    res.status(400).json({ message: err.message });
} 

};



const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const showtimesWithAvailability = await Promise.all(
      movie.availableShowtimes.map(async (time) => {
        const bookings = await Booking.find({
          movieId: movie._id,
          showtime: time,
        });

        const bookedSeats = bookings.reduce(
          (sum, b) => sum + b.numberOfTickets,
          0
        );

        return {
          time,
          availableSeats: movie.capacityPerShowtime - bookedSeats,
        };
      })
    );

    res.json({
      ...movie.toObject(),
      showtimes: showtimesWithAvailability,
    });

  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addMovie,
  getMovies,
  getMovieById
};