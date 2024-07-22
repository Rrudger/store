import React, { useEffect } from 'react';
import { useDispatch, useState, useSelector } from 'react-redux';
 import {
  Row,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { isEmpty, merge } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../utils/dbUtils.js';
import { logOut, sortBy } from '../../utils/utils.js';
import { actions as userActions } from '../../slices/userSlice.js';
import OrderCard from './OrderCard.jsx';

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userState.id);
  const orders = useSelector((state) => state.userState.orders);
  const keys = sortBy('date', 'des', orders);
  const goodsList = useSelector((state) => state.mainState.goodsList);

  useEffect(() => {
    if (isEmpty(orders)) {
      getOrders(userId)
      .then((response) => {
        dispatch(userActions.setOrders(response.data))
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
    }
  });

  return ( isEmpty(orders) || isEmpty(goodsList) ?
    <div className='my-4 mx-3'>{i18n.t('user_orders.no_orders')}</div> :
    <div>
      {keys.map((key) => {
        const order = orders[key];
        const itemsList = orders[key].itemsList.map((item) => {
          return {
            id: item.item_id,
            name: goodsList[item.item_id].name,
            quantity: item.quantity,
            price_eur: goodsList[item.item_id].price_eur,
            price_cent: goodsList[item.item_id].price_cent
          }

        });

        return <OrderCard key={key} order={{
          id: orders[key].id,
          created_at: orders[key].created_at,
          status: orders[key].status,
          itemsList: itemsList,
        }} />
      }
      )}
      <ToastContainer />
    </div>
  )
};

export default UserOrders;
