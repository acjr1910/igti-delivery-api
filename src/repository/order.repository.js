const fs = require('fs').promises;
const path = require('path');

const db = path.resolve(__dirname, '../db/pedidos.playground.json');

const readDB = async (dbPath) => JSON.parse(await fs.readFile(dbPath, 'utf-8'));

// TODO: Refactor services and repository.
// Repository must handle data methods only.
// All other bussiness logic, must be in services.

// TODO: Create default error response method.

const placeOrder = async ({ client, product, value }) => {
  const createDeliveryOrder = (data) => {
    return {
      id: data.nextId,
      cliente: client,
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
    const data = await readDB(db);
    const deliveryOrder = createDeliveryOrder(data);    
    await fs.writeFile(db, appendOrder(data, deliveryOrder));
    return JSON.stringify(deliveryOrder);
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const updateOrder = async ({ id, client, product, value }) => {
  const updateValues = (data, index) => {
    data.pedidos[index].cliente = client;
    data.pedidos[index].produto = product;
    data.pedidos[index].valor = value;
  };

  try {
    const data = await readDB(db);
    const index = data.pedidos.findIndex((o) => o.id === id);
    const hasFoundOrder = index > -1;
    if (hasFoundOrder) {
      updateValues(data, index);
      await fs.writeFile(db, JSON.stringify(data));
      return JSON.stringify(data.pedidos[index]);
    } else {
      return JSON.stringify({
        error: {
          message: 'We could not found any order with given id.',
        },
      })
    }
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const updateStatus = async ({ id, status }) => {
  const updateValues = (data, index) => {
    data.pedidos[index].entregue = status;
  };

  try {
    const data = await readDB(db);
    const index = data.pedidos.findIndex((o) => o.id === id);
    const hasFoundOrder = index > -1;
    if (hasFoundOrder) {
      updateValues(data, index);
      await fs.writeFile(db, JSON.stringify(data));
      return JSON.stringify(data.pedidos[index]);
    } else {
      return JSON.stringify({
        error: {
          message: 'We could not found any order with given id.',
        },
      })
    }
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const deleteOrder = async ({ id }) => {
  try {
    const data = await readDB(db);
    let deletedOrderItem = null;
    data.pedidos = data.pedidos.filter((order) => {
      if (order.id !== id) return order;
      deletedOrderItem = order;
    });

    if (deletedOrderItem) {
      await fs.writeFile(db, JSON.stringify(data));
      return JSON.stringify({
        deleted: true,
        ...deletedOrderItem
      });
    } else {
      return JSON.stringify({
        error: {
          message: 'We could not found any order with given id.',
        },
    })
    }
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const getOrder = async ({ id }) => {
  try {
    const data = await readDB(db);
    const order = data.pedidos.find((p) => Number(p.id) === Number(id));

    if (order) {
      return JSON.stringify(order);
    } else {
      return JSON.stringify({
        error: {
          message: 'We could not found any order with given id.',
        },
    })
    }
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const getTotalByClient = async ({ client }) => {
  try {
    const data = await readDB(db);
    const total = data.pedidos.reduce((acc, curr) => {
      if (curr.entregue) {
        if (curr.cliente === client) return acc + curr.valor;
      }
      return acc;
    }, 0);

    console.log(total)
    return JSON.stringify({ total });
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const getTotalByProduct = async ({ product }) => {
  try {
    const data = await readDB(db);
    const total = data.pedidos.reduce((acc, curr) => {
      if (curr.entregue) {
        if (curr.produto === product) return acc + curr.valor;
      }
      return acc;
    }, 0);

    return JSON.stringify({ total });
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

const getTopSales = async () => {
  try {
    const data = await readDB(db);
    let topSales = {};
    data.pedidos.forEach((p) => {
      const { entregue, produto } = p;
      if (entregue) {
        if (topSales[produto]) {
          topSales[produto] += 1;
        } else {
          topSales[produto] = 1;
        }
      }
    });
    topSales = Object.entries(topSales).sort((a,b) => b[1] - a[1]).map((p) => `${p[0]} - ${p[1]}`);
    return JSON.stringify({ topSales });
  } catch(err) {
    console.log(err);
    return JSON.stringify({
        error: {
          message: 'Sorry, something went wrong.',
        },
    })
  }
};

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