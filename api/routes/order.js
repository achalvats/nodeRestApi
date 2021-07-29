const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders list'
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'order detail for product id',
        Id: req.params.orderID
    });
});

router.post('/', (req, res, next) => {
    const order={
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'user created!',
        orderCreated: order
    });
});

router.delete('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'user deleted',
        ID: req.params.orderID
    });
});

module.exports = router;