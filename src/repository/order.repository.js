const fs = require('fs');
const path = require('path');

const db = path.resolve(__dirname, '../db/pedidos.playground.json')

// TODO: convert into async (use fs.promises);
const placeOrder = async ({ clientId, product, value }) => {
  let order;
  const createOrder = (data) => {
    return {
      id: data.nextId,
      cliente: clientId,
      produto: product,
      valor: value,
      entregue: false,
      timestamp: new Date()
    }
  }
  const appendOrder = (data) => {
    order = createOrder(data);
    return JSON.stringify({
      ...data,
      nextId: data.nextId + 1,
      pedidos: [...data.pedidos, order]
    })
  }

  fs.readFile(db, 'utf-8', (err, data) => {
    if (err) {
      throw new Error(err);
    }
    fs.writeFile(db, appendOrder(JSON.parse(data)), (err) => {
      if (err) throw new Error(err);
      console.log(order);
      return order;
    });
  });
};

module.exports = {
  placeOrder
}