const router = require('express').Router();
const Restaurant = require('../model/Restaurant');
const TableRoom = require('../model/TableRoom');
const verifyToken = require('./verifyToken');
const { verifyContainsRestaurant } = require('./verifyRestaurant');

router.post('/create', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    const tableRoom = new TableRoom({
        title: req.body.title,
        booked: false
    });

    try {
        restaurant.room.push(tableRoom);
        await restaurant.save();
        await tableRoom.save();
        res.send({
            tableRoom: tableRoom._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/remove', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    if (!restaurant.room.includes(req.body.tableRoomId)) {
        return res.status(400).send('Table room is wrong.');
    }

    try {
        const removeIndex = restaurant.room.indexOf(req.body.tableRoomId);
        restaurant.room.splice(removeIndex, 1);
        await restaurant.save();

        await TableRoom.deleteOne({
            _id: req.body.tableRoomId
        });

        res.send('Removed element.');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/clear', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let room = await TableRoom.findOne({
        _id: req.body.tableRoomId
    });

    try {
        room.users = [];
        room.booked = false;
        room.password = "0000";
        await room.save();

        res.send({
            room: room,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
