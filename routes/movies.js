const express = require('express');
const { getAllMovies, getMovie, createNewMovie, updateMovie, deleteMovie} = require('../controllers/Movies')

const router = express.Router();

// Endpoint for the getAllMovies
router.get('/', getAllMovies);

//Endpoint to get a movie;
router.get('/:id', getMovie)

//Endpoint for creating New Movies
router.post('/addNewMovie', createNewMovie)

//Endpoint to update movie.
router.put('/:id', updateMovie)

// Endpoint to delete movie.
router.delete('/:id', deleteMovie)

module.exports = router;

