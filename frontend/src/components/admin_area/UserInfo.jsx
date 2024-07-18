import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
} from 'react-bootstrap';
import { isEqual, isEmpty } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { actions as adminActions} from '../../slices/adminSlice.js';
import { actions as userActions} from '../../slices/userSlice.js';
import { getOrders } from '../../utils/dbUtils.js';
import { logOut } from '../../utils/utils.js';
import { getUsersList } from '../../utils/userUtils.js';
import UserCard from './UserCard.jsx';
import OrdersList from './OrdersList.jsx';

const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem('current_user');
  const currentUser = useSelector((state) => state.adminState.usersList)
  .filter((user) => user.id === id)[0];
  const orders = useSelector((state) => state.adminState.userOrders);
  const activeOrders = isEmpty(orders) ? 0 : orders.reduce((count, curr) => {
    return !['deleted', 'archived'].includes(curr.status) ? count + 1 : count
  }, 0);
  const archivedOrders = isEmpty(orders) ? 0 : orders.length - activeOrders;

  useEffect(() => {
      getOrders(id)
      .then((response) => {
        if (!isEqual(response.data, orders)) {
          dispatch(adminActions.setUserOrders(response.data))
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error(err.response.data);
          setTimeout(() => {
            logOut();
            dispatch(userActions.logOut());
            navigate('/');
          }, "1000");
        } else {
          toast.error(err.message);
        }
      });

      if (isEmpty(currentUser)) {
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
      }

  });


  return (
    <Container>
      {!isEmpty(currentUser) &&
        <>
        <UserCard id={id}
        name={currentUser.name}
        created_at={new Date(currentUser.created_at)}
        activeOrders={activeOrders}
        archivedOrders={archivedOrders}
        />
        <OrdersList orders={orders}/>
        </>
      }
      <ToastContainer />
    </Container>
  );
};

export default UserInfo;
