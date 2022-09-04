const repository = require('../repository/order.repository');

const placeOrder = async ({ client, product, value }) => {
  return await repository.placeOrder({ client, product, value });
};

const updateOrder = async ({ id, client, product, value }) => {
  return await repository.updateOrder({ id, client, product, value });
};

const updateStatus = async ({ id, status }) => {
  return await repository.updateStatus({ id, status });
};

const deleteOrder = async ({ id }) => {
  return await repository.deleteOrder({ id });
}

const getOrder = async ({ id }) => {
  return await repository.getOrder({ id });
}

const getTotalByClient = async ({ client }) => {
  return await repository.getTotalByClient({ client });
}

const getTotalByProduct = async ({ product }) => {
  return await repository.getTotalByProduct({ product });
}

const getTopSales = async () => {
  return await repository.getTopSales();
}

module.exports = {
  placeOrder,
  updateOrder,
  updateStatus,
  deleteOrder,
  getOrder,
  getTotalByClient,
  getTotalByProduct,
  getTopSales
}