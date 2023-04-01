const express = require('express')
const { getAllCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer } = require('../controllers/Customer')

const router = express.Router();

//Endpoint to fetch all customers
router.get('/', getAllCustomers);

//Post or create a customer
router.post('/signUp', createCustomer)

// get a single customer by id
router.get ('/:id', getCustomer)

// update a customer data
router.put('/:id', updateCustomer)

// deleting a customer.
router.delete('/:id', deleteCustomer)

module.exports = router;

