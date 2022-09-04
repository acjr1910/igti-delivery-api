const services = require('../services/order.services.js');
const querystring = require('querystring');

const placeOrder = async (req, res) => {
  const { cliente: client, produto: product, valor: value } = req.body;
  const hasRequiredParams = client && product && value;
  
  res.setHeader("Content-Type", "application/json");

  if (hasRequiredParams)
    return res.status(200).send(await services.placeOrder({ client, product, value }));


  return res.status(422).send({
    error: {
      message: 'Missing required parameters.',
      requiredParameters: ['cliente', 'produto', 'valor']
    },
  });
};

const updateOrder = async (req, res) => {
  const { id, cliente: client, produto: product, valor: value } = req.body;
  const hasRequiredParams = id && client && product && value;

  res.setHeader("Content-Type", "application/json");

  if (hasRequiredParams)
    return res.status(200).send(await services.updateOrder({ id, client, product, value }));

  return res.status(422).send({
    error: {
      message: 'Missing required parameters.',
      requiredParameters: ['id', 'cliente', 'produto', 'valor']
    },
  });
}

const updateStatus = async (req, res) => {
  const { id, entregue: status } = req.body;
  const hasRequiredParams = id && 'entregue' in req.body;

  res.setHeader("Content-Type", "application/json");

  if (!(typeof status === 'boolean')) {
    return res.status(422).send({
      error: {
        message: 'entregue must be a boolean',
      },
    });
  }

  if (!hasRequiredParams) {
    return res.status(422).send({
      error: {
        message: 'Missing required parameters.',
        requiredParameters: ['id', 'entregue']
      },
    });
  }

  return res.status(200).send(await services.updateStatus({ id, status }));
}

const deleteOrder = async (req, res) => {
  const { id } = req.body;
  const hasRequiredParams = id;

  res.setHeader("Content-Type", "application/json");

  if (!hasRequiredParams) {
    return res.status(422).send({
      error: {
        message: 'Missing required parameters.',
        requiredParameters: ['id']
      },
    });
  }

  return res.status(200).send(await services.deleteOrder({ id }));
}

const getOrder = async (req, res) => {
  const { id } = req.params;
  const hasRequiredParams = id;

  res.setHeader("Content-Type", "application/json");

  if (!hasRequiredParams) {
    return res.status(422).send({
      error: {
        message: 'Missing required parameters.',
        requiredParameters: ['id']
      },
    });
  }

  return res.status(200).send(await services.getOrder({ id }));
}

const getTotalByClient = async (req, res) => {
  const { cliente: client } = req.params;
  const hasRequiredParams = client;

  res.setHeader("Content-Type", "application/json");

  if (!hasRequiredParams) {
    return res.status(422).send({
      error: {
        message: 'Missing required parameters.',
        requiredParameters: ['cliente']
      },
    });
  }

  return res.status(200).send(await services.getTotalByClient({ client }));
}

const getTotalByProduct = async (req, res) => {
  const { produto: product } = req.params;
  const hasRequiredParams = product;

  res.setHeader("Content-Type", "application/json");

  if (!hasRequiredParams) {
    return res.status(422).send({
      error: {
        message: 'Missing required parameters.',
        requiredParameters: ['produto']
      },
    });
  }

  return res.status(200).send(await services.getTotalByProduct({ product }));
}

const getTopSales = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).send(await services.getTopSales());
}

module.exports = {
  placeOrder,
  updateOrder,
  updateStatus,
  deleteOrder,
  getOrder,
  getTotalByClient,
  getTotalByProduct,
  getTopSales,
}