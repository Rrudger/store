import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Row
} from 'react-bootstrap';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { actions as userActions} from '../../slices/userSlice.js';

const ArchivedOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Row>
      archived orders list
      <ToastContainer />
    </Row>
  );
};

export default ArchivedOrders;
