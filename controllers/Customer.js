const express = require('express');
const {StatusCodes} = require('http-status-codes');
const Joi = require('joi');

//requiring customer model from the models
const Customer = require('../models/customers');

//fetch all customers
const getAllCustomers = async (req, res) => {
    try{
        const customers = await Customer.find().sort('name');
        res.status(StatusCodes.OK).json({customers})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

//create a customer
const createCustomer = async (req, res,) => {
    try{
        const { name, isGold, phoneNumber, password } = req.body

        const schema = Joi.object({
            name: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            password: Joi.string().required()
        })
        const result = schema.validate(req.body);

        if(result.error){
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message)
        }

        const numberExists = await Customer.findOne({ phoneNumber });
        if(numberExists){
            res.status(StatusCodes.BAD_REQUEST).json({message: "Number already exist"})
            
        }

        const customer = await Customer.create({ name, isGold, phoneNumber, password})
        res.status(StatusCodes.CREATED).json({customer})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error});
    }
}

//Get a customer by ID
const getCustomer = async (req, res) => {
    try{
        const { id } = req.params

        if(!id) {
            res.status(StatusCodes.NOT_FOUND).json({"message": "please provide id"});
            return
        }

        const customer = await Customer.findById({_id : id})
        
        if(!customer){
            res.status(StatusCodes.BAD_REQUEST).send(`customer with id ${req.params.id} not found `)
        }

        res.status(StatusCodes.OK).json({customer})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error});
    }
}


// updating a customer
const updateCustomer = async (req, res) => {
    try{
        const { id } = req.params
        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: 'please provide a ID'})
        }

        const customer = Customer.findById({_id:id})
        if(!customer){
            res.status(StatusCodes.NOT_FOUND).send(`Customer with ID ${req.params.id} not found`)
        }

        const {name, isGold, phoneNumber, password} = req.body

        const schema = Joi.object({
            name: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            password: Joi.string().minOfSpecialCharacters().minOfLowercase(2).minOfUppercase(1).minOfNumeric(1).required()

        })
        const result = schema.validate(req.body);

        if(result.error){
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message)
        }

        const updateCustomerInfo = await Customer.updateOne({ id: customer.id}, {name, isGold, phoneNumber, password})
        res.status(StatusCodes.ACCEPTED).json({message: "customer data was successfully updated", updateCustomerInfo})

    } catch(error){
        res.status(StatusCodes.BAD_REQUESt).json({message:'error'})
    }
}

// deleting a customer
const deleteCustomer = async (req, res) => {
    try{
        const { id } = req.params
        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: "please provide id"});
        }

        const customer = await Customer.deleteOne({_id:id})
        if(!customer){
            res.status(StatusCodes.NOT_FOUND).send(`Customer with ID ${req.params.id} not found`)
        }

        res.status(StatusCodes.OK).json({message: "Customer data deleted successfully"})
    }catch(error){
        res.status(StatusCodes.BAD_REQUESt).json({error})
        
    }
}
    


 module.exports = {
    getAllCustomers,
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
 };