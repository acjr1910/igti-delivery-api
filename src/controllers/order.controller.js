const services = require('../services/order.services.js');

const placeOrder = async (req, res, next) => {
  const { cliente: clientId, produto: product, valor: value } = req.query;
  if (!clientId) return res.status(422).send('O parâmetro `cliente` é obrigatório.');
  if (!product)  return res.status(422).send('O parâmetro `produto` é obrigatório.');
  if (!value)    return res.status(422).send('O parâmetro `valor` é obrigatório.');
  return res.status(200).send(await services.placeOrder({ clientId, product, value }));
};

module.exports = {
  placeOrder,
}