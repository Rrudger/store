import React from 'react';
import { useSelector } from 'react-redux';
import {
  Row,
} from 'react-bootstrap';
import { findIndex } from 'lodash';
import { sortBy } from '../../utils/utils.js';
import OrderCard from '../user_area/OrderCard.jsx';

const OrdersList = ({ orders, mode, sortCr }) => {
  const goodsList = useSelector((state) => state.mainState.goodsList);
  const keys = sortBy(sortCr, 'des', orders);

  return (
    <Row>
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

      return <OrderCard key={key} mode={mode} order={{
        id: orders[key].id,
        user_id: orders[key].user_id,
        user_name: orders[key].user_name,
        created_at: orders[key].created_at,
        status: orders[key].status,
        itemsList: itemsList,
      }} />
    }
    )}
    </Row>
  )
}

export default OrdersList;
