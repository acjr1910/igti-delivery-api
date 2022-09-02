const repository = require('../repository/order.repository');

const placeOrder = async ({ clientName, product, value }) => await repository.placeOrder({ clientName, product, value }); 

module.exports = {
  placeOrder,
}