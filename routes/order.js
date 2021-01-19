const router = require('express').Router();
const Restaurant = require('../model/Restaurant');
const TableRoom = require('../model/TableRoom');
const Order = require('../model/Order');
const verifyToken = require('./verifyToken');

router.post('/push', verifyToken, async (req, res) => {
    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    if (restaurant === null) {
        return res.status(400).send('Restaurant ID is wrong.');
    }

    if (restaurant.room.includes(req.body.tableRoomId) === false) {
        return res.status(400).send('Table room ID is not in Restaurant.');
    }

    let tableRoom = await TableRoom.findOne({
        _id: req.body.tableRoomId
    });

    if (tableRoom.users.includes(req.user._id) === false) {
        return res.status(400).send('User ID is not in TableRoom.');
    }

    let menuElementIds = req.body.menuElementIds;

    for (let i = 0; i < menuElementIds.length; i++) {
        if (restaurant.menu.includes(menuElementIds[i]) === false) {
            return res.status(400).send('Menu Element ID is not in Restaurant.');
        }
    }

    let itemStatus = [];
    for (let i = 0; i < menuElementIds.length; i++) {
        itemStatus.push(0);
    }

    const order = new Order({
        items: req.body.menuElementIds,
        itemCount: req.body.menuElementCount,
        itemStatus: itemStatus,
        restaurantId: req.body.restaurantId,
        roomId: req.body.tableRoomId,
        userId: req.user._id,
        active: true
    });

    try {
        await order.save();
        res.send({
            order: order._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;


