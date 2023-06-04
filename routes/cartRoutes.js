const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

router.post('/add', async (req, res) => {
    try {
        const id = req.body.id;
        const product = req.body.product;
        const sessionId = req.body.sessionId;

        const cartItem = new CartItem({ id, sessionId, product: { ...product, amount: 1 } });
        await cartItem.save();

        const updatedCartItems = await CartItem.find({ sessionId });

        res.json(updatedCartItems);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:sessionId', async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const cartItems = await CartItem.find({ sessionId });

        res.json(cartItems);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/delete/:id/:sessionId', async (req, res) => {
    try {
        const id = req.params.id;
        const sessionId = req.params.sessionId;

        await CartItem.findOneAndDelete({ id, sessionId });

        const updatedCartItems = await CartItem.find({ sessionId });

        res.json(updatedCartItems);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteAll/:sessionId', async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        await CartItem.deleteMany({ sessionId });

        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/update/:id/:sessionId', async (req, res) => {
    try {
        const id = req.params.id;
        const sessionId = req.params.sessionId;
        const amount = req.body.amount;

        const cartItem = await CartItem.findOne({ id, sessionId });

        if (!cartItem) {
            res.status(500).json({error: 'Not found!'})
            return;
        }

        cartItem.product.amount = amount;
        await cartItem.save();

        const updatedCartItems = await CartItem.find({ sessionId });

        res.json(updatedCartItems);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;