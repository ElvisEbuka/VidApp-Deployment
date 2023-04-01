const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    }]
})

const Genre = mongoose.model('genre', GenreSchema)
module.exports =  Genre