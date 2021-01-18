const router = require('express').Router();
const MenuElement = require('../model/MenuElement');
const { getRestaurant } = require('./verifyRestaurant');

router.post('/',  async (req, res) => {
    const restaurantId = req.body.restaurantId;

    try {
        const restaurant = await getRestaurant(restaurantId);

        if (!restaurant) {
            return res.status(400).send('Restaurant is wrong');
        }

        res.send({
            restaurant: {
                _id: restaurant._id,
                menu: restaurant.menu
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/get',  async (req, res) => {
    try {
        const element = await MenuElement.findOne({
            _id: req.body.menuElementId
        });

        if (!element) {
            return res.status(400).send('MenuElement ID is wrong.');
        }

        res.send({
            menuElement: {
                _id: element._id,
                title: element.title,
                description: element.description,
                image: element.image,
                price: element.price
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
