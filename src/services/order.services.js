const repository = require('../repository/order.repository');

const placeOrder = async ({ clientId, product, value }) => await repository.placeOrder({ clientId, product, value }); 

module.exports = {
  placeOrder,
}