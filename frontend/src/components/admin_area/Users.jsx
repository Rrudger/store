import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  ListGroup,
  Badge,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { difference } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import { actions as adminActions} from '../../slices/adminSlice.js';
import { actions as userActions} from '../../slices/userSlice.js';
import { getUsersList } from '../../utils/userUtils.js';

const UserRow = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeOrders = 0;
  const date = new Date(user.created_at);
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const handleOpenUser = () => {
    localStorage.setItem('current_user', user.id);
    navigate('/userInfo');
  }

  return (
    <ListGroup.Item id={user.id} action onClick={handleOpenUser}
    as="li" className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <h4 className="fw-bold">{user.name}</h4>
          {`created at ${date.getDate()}/${month}/${date.getFullYear()}`}
        </div>
        <Badge bg="primary" pill data-tooltip-id="my-tooltip-1">
          {activeOrders}
        </Badge>
        <Tooltip id="my-tooltip-1" place="bottom" variant="info" content="active orders" />
    </ListGroup.Item>
  )
}

const Users = () => {
  const role = useSelector((state) => state.userState.role);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token || role === 'user') {
      navigate('/');
    }
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.adminState.usersList);

  getUsersList()
  .then((response) => {
    dispatch(adminActions.setUsersList(response.data));
  })
  .catch((err) => {
    toast.error(err.response.data);
    if (err.response.status === 403) {
      setTimeout(() => {
        localStorage.clear();
        dispatch(userActions.logOut());
        navigate('/');
      }, "1500");
    }
  })


  return (
    <Container>
      <h2 className='ms-4'>{i18n.t('admin.users_title')}</h2>
      <ListGroup as='ol'>
        {usersList.map((user) => <UserRow key={user.id} user={user}/> )}
      </ListGroup>
      <ToastContainer />
    </Container>
  );
};

export default Users;
