import React from 'react';
import { useSelector } from 'react-redux';
import {
  Row,
} from 'react-bootstrap';
import { sortBy } from '../../utils/utils.js';
import OrderCard from '../user_area/OrderCard.jsx';

const OrdersList = ({ orders }) => {
  const goodsList = useSelector((state) => state.mainState.goodsList);
  const keys = sortBy('time', 'des', orders)

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

      return <OrderCard key={key} order={{
        id: orders[key].id,
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
