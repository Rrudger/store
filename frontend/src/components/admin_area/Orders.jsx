import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Image,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = useSelector((state) => state.userState.role);
  useEffect(() => {
    if (!token || role === 'user') {
      navigate('/');
    }
  })

  return (
    <Container>
      <Image alt="test image" src='http://localhost:5001/public/images/star.png' />
    </Container>
  );
};

export default Orders;
