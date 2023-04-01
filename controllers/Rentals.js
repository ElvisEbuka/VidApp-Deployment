const express = require('express');
const { StatusCodes } = require('http-status-codes');

const Rental = require('../models/rentals');
const Movie = require('../models/movies');
const Customer = require('../models/customers');


// //getting all rentals
const getAllRentals = async (req, res) => {
    try{
        const rentals = await Rental.find().sort('dateOut');
        
        if(rentals.length === 0){
           return res.status(StatusCodes.NOT_FOUND).json({message: "Rentals not available"})
        }

        for (i = 0; i < rentals.length; i++){
            await rentals[i].populate('customers', { name: 1, _id: 0 }).populate('movies', { name: 1, _id: 0 }).execPopulate(); 
        }
        res.status(StatusCodes.OK).json(rentals)
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "error"})
    }
}

// create the Rentals by data
// api/rental/:movieId/:customerId
const createRental = async (req, res) =>{
    try{
        const customer = await Customer.findById(req.params.customerId)
        if(!customer){
            res.status(StatusCodes.NOT_FOUND).json({message: "customer not found"})
        }

        const movies = await Movie.findById(req.params.movieId)
        if(movies.numberInStock === 0){
            res.status(StatusCodes.NOT_FOUND).json({messages: "movie is out of stock"})
        }

        const { dateOut, dateReturned, rentalFee } = req.body
        if(!dateOut || !dateReturned || !rentalFee){
            res.status(StatusCodes.NOT_FOUND).json({message: "all field required"})
        }

        const rental = await Rental.create({customers, movies, dateOut, dateReturned, rentalFee})
        await Movie.updateOne({_id: movie.id}, {$inc: {numberInStock: -1, dailyRentalRate: 1}});
        res.status(StatusCodes.CREATED).json({rentals})


    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "error"})
    }
}

//UPDATING a Rental
const updateRental = async (req, res) => {
    try{
        const rental = await Rental.findById({_id:id})

        if(!rental){
            res.status(StatusCodes.NOT_FOUND).json({message: "rentals not found"})
        }

        const { customerId, movieId} = req.params

        if(!customerId || !movieId){
            res.status(StatusCodes.NOT_FOUND).json({messge: "all fields are required"})
        }

        const { dateOut, dateReturned, rentalFee} = req.body

        if(!dateReturned || !rentalFee){
            res.status(StatusCodes.NOT_FOUND).json({message: "all fields are required"})
        }

        const updateRentalInfo = await Rental.updateOne({_id: rental.id}, { dateOut, dateReturned, rentalFee })
        res.status(StatusCodes.CREATED).json({message: "Data updated successfully"})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "error"})

    }
}

//Deleting a rental from the database
const deleteRental = async(req, res) => {
    try{
        const rental = await Rental.findOne({_id: req.params.id})
        if (!rental){
        res.status(StatusCodes.NOT_FOUND).json({message: "rental not found"})
        }

        const deleteRental = Rental.deleteOne({_id: rental.id})
        res.status(StatusCodes.OK).json({message: "rental deleted successfully"});
    } catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "error"})

    }
}

module.exports = {
    getAllRentals,
    createRental,
    updateRental,
    deleteRental
}