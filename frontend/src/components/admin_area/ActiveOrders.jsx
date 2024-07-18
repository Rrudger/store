import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Row
} from 'react-bootstrap';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { actions as userActions} from '../../slices/userSlice.js';
import { getActiveOrders } from '../../utils/dbUtils.js';

const ActiveOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  getActiveOrders()
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    toast.error(err.response.data || err.message);
    if (err.response.status === 403) {
      setTimeout(() => {
        localStorage.clear();
        dispatch(userActions.logOut());
        navigate('/');
      }, "1500");
    }
  });

  return (
    <Row>
      active orders list
      
      <ToastContainer />
    </Row>
  );
};

export default ActiveOrders;
