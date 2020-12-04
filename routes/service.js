const router = require('express').Router();
const Restaurant = require('../model/Restaurant');
const ServiceUser = require('../model/ServiceUser');
const verifyToken = require('./verifyToken');
const { verifyContainsRestaurant } = require('./verifyRestaurant');

router.post('/add', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    const service = new ServiceUser({
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        type: req.body.serviceType
    });

    try {
        restaurant.service.push(service);
        await service.save();
        await restaurant.save();
        res.send({
            service: {
                id: service.id,
                type: service.type
            },
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

    let service = await ServiceUser.findOne({
        restaurantId: req.body.restaurantId,
        userId: req.body.userId
    });

    if (service == null) {
        return res.status(400).send('User not found.');
    }

    try {
        const removeIndex = restaurant.service.indexOf(service._id);
        restaurant.service.splice(removeIndex, 1);
        await restaurant.save();

        await ServiceUser.deleteOne({
            _id: service._id
        });

        res.send('Removed element.');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/modify', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let service = await ServiceUser.findOne({
        restaurantId: req.body.restaurantId,
        userId: req.body.userId
    });

    if (service == null) {
        return res.status(400).send('User not found.');
    }

    try {
        service.type = req.body.serviceType;
        await service.save();

        res.send({
            service: service
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
