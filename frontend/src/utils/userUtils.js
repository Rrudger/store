import axios from 'axios';
import { trim } from 'lodash';

const loginUser = async (name, password) => {
  const query = `?name=${trim(name, ' ')}&pas=${trim(password, ' ')}`;
  return axios.get(`http://localhost:5001/users/login${query}`)
};

const singUp = async (name, password) => {
  return axios.post('http://localhost:5001/users/signup',
  {
    username: trim(name, ' '),
    password: trim(password, ' ')
  },
  {
    headers: {
      'content-type': 'application/json'
    }
  }
)
};

const getUsersList = async () => {
  const token = localStorage.getItem('token');
  return axios.get('http://localhost:5001/users/users_list',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const getUserInfo = async (id) => {
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:5001/users/user_info?id=${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

const deleteAccount = async (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`http://localhost:5001/users/user?id=${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
)
};

const changeUserAttr = async (id, attr, newValue) => {
  const token = localStorage.getItem('token');
  return axios.post(`http://localhost:5001/users/alter_user`,
    {
      id: id,
      attr: attr,
      value: newValue,
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
)
}

const updatePassword = async (id, oldPassword, newPassword) => {
  const token = localStorage.getItem('token');
  return axios.post(`http://localhost:5001/users/alter_password`,
    {
      id: id,
      old_password: oldPassword,
      new_password: newPassword,
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
  changeUserAttr,
  deleteAccount,
  getUserInfo,
  getUsersList,
  loginUser,
  singUp,
  updatePassword,
}
