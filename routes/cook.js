const router = require('express').Router();
const Order = require('../model/Order');
const verifyToken = require('./verifyToken');
const { verifyContainsServiceUser } = require('./verifyRestaurant');

router.post('/cooked', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let order = await Order.findOne({
        _id: req.body.orderId
    });

    let index = req.body.index;
    if (order.itemStatus[index] !== 0) {
        return res.status(400).send('Bad dish state.');
    }

    try {
        order.itemStatus[index] = 1;
        order.markModified('itemStatus');
        await order.save();
        res.send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get', verifyToken, async (req, res) => {
    if (await verifyContainsServiceUser(req) === false) {
        return res.status(400).send('User not in Restaurant Service.');
    }

    let orders = await Order.find({
        restaurantId: req.body.restaurantId,
        active: true,
        done: false
    });


    try {
        res.send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
