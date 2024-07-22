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

const selectOrders = async (page) => {
  const token = localStorage.getItem('token');
  const endPoint = page === 'orders' ? 'active_orders' : 'archived_orders';
  return axios.get(`http://localhost:5001/orders/${endPoint}`,
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

const switchStatus = (id, newStatus) => {
  const token = localStorage.getItem('token');
  return axios.post(`http://localhost:5001/orders/switch_status`,
    {
      id: id,
      newStatus: newStatus.toLowerCase(),
    },
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
  getOrders,
  getStorage,
  postOrder,
  selectOrders,
  switchStatus,
}
