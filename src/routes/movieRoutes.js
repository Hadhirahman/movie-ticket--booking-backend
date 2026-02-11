const express = require("express");
const { addMovie, getMovies, getMovieById } = require("../controllers/movieController");

const router = express.Router();

router.post("/", addMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);

module.exports = router;