const express = require("express");
const mongoose = require('mongoose')
const morgan = require('morgan');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const routes = require('./routes/routes');

const app = express();

app.use(cors({
    origin: '*'
}));

// Connect to database
connectDB();

app.use(express.json({ extended: false }));

app.use('/', routes);

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'development') {
    console.log('dev');
    app.get('/', (req, res) => {
        res.send("API is running..");
    });
} else {
    console.log('prod');
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    }) 
}

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));