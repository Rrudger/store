import React from 'react';
import {
  Container,
} from 'react-bootstrap';
import UserInfo from './UserInfo.jsx';
import UserOrders from './UserOrders.jsx';



const ClientArea = () => {
  return (
    <Container>
      <UserInfo />
      <UserOrders />
    </Container>
  )
}



export default ClientArea;
