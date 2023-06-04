const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json({ shops, sessionId: uuidv4() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
