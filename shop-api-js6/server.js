const express = require('express');
const products = require('./app/products');
const categories = require('./app/categories');
const users = require('./app/users');
const cors = require('cors');
const config = require('./app/config');
const mongoose = require('mongoose');

const app = express();
const port = 8000;


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());

const run = async () => {
    await mongoose.connect(config.db.url + '/' + config.db.name);
    console.log('Mongo connected');

    app.use('/products', products());
    app.use('/categories', categories());
    app.use('/users', users());

    app.listen(port, () => {
        console.log('Server started on port ' + port);
    });
};

run().catch(console.error);
