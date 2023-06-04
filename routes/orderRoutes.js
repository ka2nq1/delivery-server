const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/add', async (req, res) => {
    try {
        const order = req.body.order;

        const addedOrder = new Order(order);
        await addedOrder.save();

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;