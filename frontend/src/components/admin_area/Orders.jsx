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
import { toast, ToastContainer } from 'react-toastify';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { actions as userActions } from '../../slices/userSlice.js';
import { actions as adminActions } from '../../slices/adminSlice.js';
import { selectOrders } from '../../utils/dbUtils.js';
import { getUsersList } from '../../utils/userUtils.js';
import OrdersList from './OrdersList.jsx';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersList = useSelector((state) => state.adminState.usersList);
  const usersNames = usersList.reduce((result, user) => {
    const newRow = { [user.id]: user.name };
    return {...result, ...newRow}
  },{});

  const [page, setPage] = useState('orders');
  const handleSwitchPage = () => {
    page === 'orders' ? setPage('archive') : setPage('orders')
  };

  const stateEndPoint = page == 'orders' ? 'activeOrders' : 'archivedOrders';
  const orders = useSelector((state) => state.adminState[stateEndPoint]);
  const ordersWithNames = orders.map((order) => {
    return {...order, user_name: usersNames[order.user_id]}
  });


  const token = localStorage.getItem('token');
  const role = useSelector((state) => state.userState.role);
  useEffect(() => {
    if (!token || role === 'user') {
      navigate('/');
    };

    if (isEmpty(orders)) {
      selectOrders(page)
      .then((response) => {
        dispatch(adminActions.setOrders({ page: page, data: response.data }));
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
    };

    if (isEmpty(usersList)) {
      getUsersList()
      .then((response) => {
        dispatch(adminActions.setUsersList(response.data));
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
    }


  });

  const [sortCr, setSort] = useState('date');
  const activeOrders = useSelector((state) => state.adminState.activeOrders);



  return (
    <Container>
      <Row>
        <Col>
          <Dropdown className='noActiveDropdown'>
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

      <OrdersList orders={ordersWithNames} mode='admin' sortCr={sortCr} />

      <ToastContainer />
    </Container>
  );
};

export default Orders;
