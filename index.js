const Joi = require('joi');
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors')
const me = require('./routes/me')
const products = require('./routes/products')

app.use(express.json());

app.use(cors());

app.use('/api/signup', users)
app.use('/api/signin', auth)
app.use('/api/me', me)
app.use('/api/products', products)

if (!process.jwtPrivateKey) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}

mongoose.connect(process.env.mongoDB)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));