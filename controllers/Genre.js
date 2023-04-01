const express = require('express');
const {StatusCodes} = require('http-status-codes');
const Joi = require('joi')

//requiring genre model from the models
const Genre = require('../models/genre')
const Movie = require('../models/movies');



//Get all genre
const getAllGenre = async (req, res) => {
    try{
        const genres = await Genre.find().sort('name')

        if(genres.length === 0){
            res.status(StatusCodes.NOT_FOUND).json({message:'No genres not found'})
        }

        for (let i = 0; i < genres.length; i++){
            await genres[i].populate('movies', {title: 1})
        }

        res.status(StatusCodes.OK).json({genres})

    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}


//Creating a new genre
const createGenre = async (req, res) => {
    try{
        const movie = await Movie.findById({_id: req.params.movieId})
        if (!movie){
            res.status(StatusCodes.NOT_FOUND).json({message: 'movie not found'})
        }
        const { name } = req.body

        const schema = Joi.object({
            name: Joi.string().required(),
        })
        const result = schema.validate(req.body);

        if(result.error){
            res.status(StatusCodes.ERROR).send(result.error.details[0].message, 'please provide a name')
        }
        
        const createdGenre = await Genre.create({ name, movies: movie._Id });
        
        //adding the genre ID to the movie collection
        movie.genres.addToSet(createdGenre._id)
        movie.save()

        res.status(StatusCodes.CREATED).json({message: 'genre created successfully', createGenre})
        
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error});

    }
}

//Get genre by ID.
const getGenre = async (req, res) => {
    try{
        const { id } = req.params

        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: 'ID number not found, please provide ID'})
        }
        const genre = await Genre.findById({_id: id});
        if(!genre){
            res.status(StatusCodes.NOT_FOUND).json({message: 'genre not found'})
        }
        //check through the movie collection and get the genre name and don't return the id of the genre
        await genre.populate('movies', {name: 1, _id: 0})
        res.status(StatusCodes.OK).json({genre})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error})

    }
}

//Updating a genre
const updateGenre = async (req, res) => {
    try{
        const { id } = req.params
        if(!id) {
            res.status(StatusCodes.NOT_FOUND).json({message: 'please provide ID'})
        }

        const genre = await Genre.findById({_id: id})
        if(!genre){
            res.status(StatusCodes.NOT_FOUND).json({message: `genre with ID number ${req.params.id} not found`})
        }

        const { name } = req.body

        const schema = Joi.object({
            name: Joi.string().required(),
        })

        const result = schema.validate(req.body);

        if(result.error){
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message)
        }

        const newGenre = await Genre.updateOne({id: genre.id}, req.body)
        res.status(StatusCodes.ACCEPTED).json({message: "genre was successfully updated", newGenre})

    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({Error})
    }
}

// //Deleting a genre
const deleteGenre = async (req, res) => {
    try{
        const { id } = req.params
        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: 'please provide ID'})
        }

        const deletedGenre = await Genre.deleteOne({_id: id});

        if(!deletedGenre){
            res.status(StatusCodes.NOT_FOUND).send(`genre with ID ${req.params.id} not found`)
        }

        res.status(StatusCodes.OK).json({message: `${deletedGenre.name} deleted successfully`})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUESt).json({error})
    }
} 


module.exports = {
    getAllGenre,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre
} 