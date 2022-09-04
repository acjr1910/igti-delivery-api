const router = require('express').Router();
const controller = require('../controllers/order.controller.js');

router.post('/order', controller.placeOrder);

router.delete('/order', controller.deleteOrder);

router.patch('/order', controller.updateOrder);

router.patch('/order/status', controller.updateStatus);

router.get('/order/totalByClient/:cliente', controller.getTotalByClient);

router.get('/order/totalByProduct/:produto', controller.getTotalByProduct);

router.get('/order/topSales', controller.getTopSales);

router.get('/order/:id', controller.getOrder);

module.exports = router;