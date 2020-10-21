const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: __dirname + '/.env'
});

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Connect to DB!');
    });

app.use(express.json());

app.use('/', authRoute);
app.use('/', userRoute);

app.listen(3000, () => {
    console.log("Server UP.");
})


