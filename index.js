const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');

dotenv.config();

//Connect DB
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('Connected to DB!')
);

// Set public path
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine as pug
app.set('view engine', 'pug');

// Home Route
app.get('/', (req, res) => {
	res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/register', (req, res) => {
	res.render('register', { title: 'Hey', message: 'Hello there!' });
});

//Import Routes
const router = require('./routes/auth');
const proute = require('./routes/post');

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', router);
app.use('/api/posts', proute);
app.listen(5000, () => console.log('Server Up and Running'));