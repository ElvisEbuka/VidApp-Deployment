const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "genre"
    }],
    numberInStock: {
        type: Number,
        required: true,
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
});


const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;