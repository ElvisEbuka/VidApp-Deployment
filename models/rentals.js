const mongoose = require('mongoose')

const rentalSchema = mongoose.Schema({
    customers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },

    movies:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "movie"
    },

    dateOut:{
        type: Date,
        default: Date.now()
    },

    dateReturned:{
        type: Date,
        default: Date.now()
    },

    rentalFee: {
        type: Number
      } 
    
})

const Rental = mongoose.model('Rental', rentalSchema)
module.exports = Rental;
