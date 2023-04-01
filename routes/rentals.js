const express = require('express');

const { getAllRentals, createRental, updateRental, deleteRental } = require('../controllers/Rentals');

const router = express.Router();

//EndPoint for getting all rentals
router.get('/', getAllRentals);

//EndPoint for creating a rental
router.post('/:movieId/:customerId', createRental)

//EndPoint for updating a rental
router.put('/', updateRental)

//EndPoint for deleting a rental
router.delete('/', deleteRental)

module.exports = router;
