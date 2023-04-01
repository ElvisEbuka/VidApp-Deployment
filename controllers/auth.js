const express = require('express');
const {StatusCodes} = require('http-status-codes');
const { createCustomerPayLoad, attachCookiesToResponse } = require('../utils');

const Customer = require("../models/customers");

//CREATING A LOGIN
const login = async (req, res) => {
    try{
        const { name, password } = req.body

        if (!name || !password){
            res.status(StatusCodes.NOT_FOUND).json({message: "please provide email and password"})
        }

        const customer = await Customer.findOne({ name });

        if(!customer){
            res.status(StatusCodes.NOT_FOUND).json({message: "Invalid Credentials"})
        }

        const isPasswordCorrect = await customer.comparePassword(candidatePassword);

        if(!isPasswordCorrect){
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid Credentials'})
        }

        const customerPayLoad = createCustomerPayLoad(customer);
        attachCookiesToResponse({res, customer: customerPayLoad})


        res.status(StatusCodes.OK).json({customer: customerPayLoad })
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}

const logout = async(req, res) => {
    res.cookies('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })
    res.status(StatusCodes.OK).json({message:'User logged out'})
}

module.exports = {
    login,
    logout
}