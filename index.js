const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Connect DB
mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('Connected to DB!') );

//Import Routes
const router = require('./routes/auth');
const proute = require('./routes/post');
//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', router);
app.use('/api/posts', proute);
app.listen(5000, () => console.log('Server Up and Running'));