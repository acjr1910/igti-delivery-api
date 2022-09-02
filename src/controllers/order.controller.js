const services = require('../services/order.services.js');

const placeOrder = async (req, res, next) => {
  const { cliente: clientName, produto: product, valor: value } = req.query;
  const hasRequiredParams = clientName && product && value;
  
  res.setHeader("Content-Type", "application/json");

  if (hasRequiredParams)
    return res.status(200).send(await services.placeOrder({ clientName, product, value }));


  return res.status(422).send({
    error: {
      message: 'Missing one or more required parameters.',
      requiredParameters: ['cliente', 'produto', 'valor']
    },
  });
};

module.exports = {
  placeOrder,
}