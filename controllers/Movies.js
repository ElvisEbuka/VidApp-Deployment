const express = require('express');
const {StatusCodes} = require('http-status-codes');
const Joi = require('joi')

//requiring movie model from the models
const Movie = require('../models/movies');
const Genre = require('../models/genre');


//Getting the collections of all Movies
const getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find().sort('name');

        if(movies.length === 0){
            res.status(StatusCodes.NOT_FOUND).json({message:'No movies not found'})
            return
        };
        for (let i = 0; i < movies.length; i++){
            await movies[i].populate('genres', {name: 1, _id: 0});
        }
        res.status(StatusCodes.OK).json({movies})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error})
    }
};

// Getting a movie by id
const getMovie = async (req, res) => {
    try{
        const { id } = req.params

        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: 'ID number not found'})
        }
        const movie = await Movie.findById({_id: id});
        if(!movie){
            res.status(StatusCodes.NOT_FOUND).json({message: 'movie not found'})
        }
        //check through the movie collection and get the genre name and don't return the id of the genre

        await movie.populate('genres', {name: 1, _id: 0})
        res.status(StatusCodes.OK).json({movie})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error})

    }
}

//Create a new movie
const createNewMovie = async (req, res) => {
    try{
        const { title, numberInStock, dailyRentalRate } = req.body
        
        const schema = Joi.object({
            title: Joi.string().required(),
            numberInStock: Joi.string().required(),
            dailyRentalRate: Joi.string().required()
        });

        const result = schema.validate(req.body)
        if(result.error){
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message)
        }

        const movie = await Movie.create(req.body)
        res.status(StatusCodes.CREATED).json({message: 'movie created successfully', movie})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error})

    }
}

//updating a movie
const updateMovie = async (req, res) => {
    try{
        const { id } = req.params
        if(!id) {
            res.status(StatusCodes.NOT_FOUND).json({message: 'please provide ID'})
        }

        const movie = await Movie.findById({_id: id})
        if(!movie){
            res.status(StatusCodes.NOT_FOUND).json({message: `movie with ID number ${req.params.id} not found`})
        }

        const { title, numberInStock, dailyRentalRate } = req.body

        const schema = Joi.object({
            name: Joi.string().required(),
            numberInStock: Joi.string().required(),
            dailyRentalRate: Joi.string().required()
        })

        const result = schema.validate(req.body);

        if(result.error){
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message)
        }

        const updateMovieInfo = await Movie.updateOne({_id: movie.id}, req.body)
        res.status(StatusCodes.ACCEPTED).json({message: "movie was successfully updated", updateMovieInfo})

    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({Error})
    }
}

//Deleting a movie
const deleteMovie = async (req, res) => {
    try{
        const { id } = req.params
        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: 'please provide ID'})
        }

        const deletedMovie = await Movie.deleteOne({_id: id});

        if(!deletedMovie){
            res.status(StatusCodes.NOT_FOUND).send(`movie with ID ${req.params.id} not found`)
        }
        res.status(StatusCodes.OK).json({message: `${deletedMovie.name} deleted successfully`})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUESt).json({error})
    }
} 
 
module.exports = {
    getAllMovies,
    getMovie,
    createNewMovie,
    updateMovie,
    deleteMovie
}