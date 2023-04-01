const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./src/db/connect')
mongoose.set('debug', true);
const customerRouter = require('./src/routes/customers');
const genreRouter = require('./src/routes/genres');
const movieRouter = require('./src/routes/movies');
const authRouter = require('./src/routes/auth');
const rentalRouter = require('./src/routes/rentals');


//initializing the server
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser(process.env.JWT_SECRET))

const PORT = process.env.PORT || 5000

server.use('/api/customer', customerRouter);
server.use('/api/genre', genreRouter);
server.use('/api/movie', movieRouter);
server.use('/api/auth', authRouter);
server.use('/api/rental', rentalRouter)


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log('connected to mongoDB...')
        server.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`)
        })
    } catch(error){
        console.log(error.message)
    }
}

start();
