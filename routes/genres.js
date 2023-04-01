const express = require('express');

const { getAllGenre, createGenre, getGenre, updateGenre, deleteGenre } = require('../controllers/Genre')

const router = express.Router();

//Get all genre
router.get('/', getAllGenre)

// creating a new genre
router.post('/:movieId', createGenre)

// Endpoint to getting a genre by ID.
router.get('/:id', getGenre)

// Endpoint to updating a genre.
router.put('/:id', updateGenre);

// Endpoint to delete movie.
router.delete('/:id', deleteGenre)

module.exports = router