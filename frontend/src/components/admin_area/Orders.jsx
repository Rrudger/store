import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Row,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { actions as userActions} from '../../slices/userSlice.js';
import ActiveOrders from './ActiveOrders.jsx';
import ArchivedOrders from './ArchivedOrders.jsx';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = useSelector((state) => state.userState.role);
  useEffect(() => {
    if (!token || role === 'user') {
      navigate('/');
    }
  });

  const [sortBy, setSort] = useState('date');
  const activeOrders = useSelector((state) => state.adminState.activeOrders);

  const [page, setPage] = useState('orders');



  const handleSwitchPage = () => {
    page === 'orders' ? setPage('archive') : setPage('orders')
  }



  return (
    <Container>
      <Row>
        <Col id='orders_dropdown'>
          <Dropdown>
            <Dropdown.Toggle variant="primary" className='text-secondary'>
              {i18n.t('admin_orders.dropdown_title')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>setSort('date')}>
                {i18n.t('admin_orders.sort_by_date')}
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>setSort('user')}>
                {i18n.t('admin_orders.sort_by_user')}
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>setSort('status')}>
                {i18n.t('admin_orders.sort_by_status')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button variant='info' onClick={handleSwitchPage}>
            {page === 'orders' ? i18n.t('buttons.archive') : i18n.t('buttons.active')}
          </Button>
        </Col>
      </Row>
      {page === 'orders' ? <ActiveOrders /> : <ArchivedOrders />}


    </Container>
  );
};

export default Orders;
