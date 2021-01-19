const router = require('express').Router();
const Order = require('../model/Order');
const verifyToken = require('./verifyToken');
const { verifyContainsServiceUser } = require('./verifyRestaurant');

router.post('/activate', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let order = await Order.findOne({
        _id: req.body.orderId
    });

    try {
        order.active = true;
        await order.save();
        res.send(order._id);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/done', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let order = await Order.findOne({
        _id: req.body.orderId
    });

    for (let i = 0; i < order.itemStatus.length; i++) {
        if (order.itemStatus[i] !== 2) {
            return res.status(400).send('Order\'s dishes not done.');
        }
    }

    try {
        order.done = true;
        await order.save();
        res.send(order._id);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/close', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let order = await Order.findOne({
        _id: req.body.orderId
    });

    if (order === null) {
        return res.status(400).send('Order ID is wrong.');
    }

    try {
        await Order.deleteOne({
            _id: req.body.orderId
        });

        res.send('Removed element.');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/delivered', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let order = await Order.findOne({
        _id: req.body.orderId
    });

    let index = req.body.index;
    if (order.itemStatus[index] !== 1) {
        return res.status(400).send('Bad dish state.');
    }

    try {
        order.itemStatus[index] = 2;
        order.markModified('itemStatus');
        await order.save();
        res.send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/get', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let orders = await Order.find({
        restaurantId: req.body.restaurantId,
        done: false
    });


    try {
        res.send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;
