const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: __dirname + '/.env'
});

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const restaurantRoute = require('./routes/restaurant');
const menuElementsRoute = require('./routes/menuElement');
const menuRoute = require('./routes/menu');
const tableRoomRoute = require('./routes/tableRoom');
const roomRoute = require('./routes/room');

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
app.use('/api/restaurant', restaurantRoute);
app.use('/api/menuElement', menuElementsRoute);
app.use('/api/menu', menuRoute);
app.use('/api/tableRoom', tableRoomRoute);
app.use('/api/room', roomRoute);

app.listen(3000, () => {
    console.log("Server UP.");
})


