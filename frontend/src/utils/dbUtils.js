import axios from 'axios';

const getStorage = async () => {
  return axios.get('http://localhost:5001/storage/goods_list');
};

const getOrders = async (id) => {
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:5001/orders/user_orders?id=${id}`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
);
};

const getActiveOrders = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:5001/orders/active_orders`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
);
};

const addItem = async (values) => {
  const token = localStorage.getItem('token');
  return axios.post('http://localhost:5001/storage/add',
  values,
    {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
)
}

const alterItem = async (id, values) => {
  const valuesArr = Object.keys(values).map((key) => {
    return { attr: key, value: values[key] }
  });
  const token = localStorage.getItem('token');
  return axios.post('http://localhost:5001/storage/alter',
  {
    id: id,
    newValues: valuesArr,
  },
    {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
)
};

const deleteItem = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`http://localhost:5001/storage/item?id=${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
)
};

const postOrder = (id, cart, status) => {
  const token = localStorage.getItem('token');
  return axios.post('http://localhost:5001/orders/addOrder',
  {
    id,
    cart,
    status,
  },
    {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
)
}

export {
  addItem,
  alterItem,
  deleteItem,
  getActiveOrders,
  getOrders,
  getStorage,
  postOrder,
}
