const express = require('express');
const { login, logout} = require('../controllers/auth');

const router = express.Router();

//Endpoint for the login route
router.post('/login', login);

//Endpoint for the logout
router.get('/logout', logout);

module.exports = router;