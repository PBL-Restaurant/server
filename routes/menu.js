const router = require('express').Router();
const { getRestaurant } = require('./verifyRestaurant');

router.get('/',  async (req, res) => {
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

module.exports = router;
