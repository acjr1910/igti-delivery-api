const router = require('express').Router();
const controller = require('../controllers/order.controller.js');

router.get('/placeOrder', controller.placeOrder);

module.exports = router;