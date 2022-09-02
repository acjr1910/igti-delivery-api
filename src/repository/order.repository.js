const fs = require('fs').promises;
const path = require('path');

const db = path.resolve(__dirname, '../db/pedidos.playground.json')

const placeOrder = async ({ clientName, product, value }) => {
  const getDbData = async () => JSON.parse(await fs.readFile(db, 'utf-8'));

  const createDeliveryOrder = (data) => {
    return {
      id: data.nextId,
      cliente: clientName,
      produto: product,
      valor: value,
      entregue: false,
      timestamp: new Date()
    }
  };

  const appendOrder = (data, order) => {
    return JSON.stringify({
      ...data,
      nextId: data.nextId + 1,
      pedidos: [...data.pedidos, order]
    })
  }

  try {
    const data = await getDbData();
    const deliveryOrder = createDeliveryOrder(data);    
    await fs.writeFile(db, appendOrder(data, deliveryOrder));
    return JSON.stringify(deliveryOrder);
  } catch(err) {
    throw new Error(err);
  }
};

module.exports = {
  placeOrder
}