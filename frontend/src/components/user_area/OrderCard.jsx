import React, { useEffect } from 'react';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '../../css/tippy_themes.css';
import { getProduct, getSum, getPriceStr, getPriceStrNoCur } from '../../utils/utils.js';
import { switchStatus } from '../../utils/dbUtils.js';
import { ReactComponent as ProcessingIcon } from '../../assets/arrow-repeat.svg';
import { ReactComponent as PaidIcon } from '../../assets/check.svg';
import { ReactComponent as SentIcon } from '../../assets/check-all.svg';
import { ReactComponent as CancelledIcon } from '../../assets/x.svg';
import { ReactComponent as ArchivedIcon } from '../../assets/archive.svg';
import DropdownOrderStatus from './DropdownOrderStatus.jsx';

const StatusIcon = ({ id, status }) => {
  if (status === 'paid') {
    return <PaidIcon id={`icon_${id}`} className='pointer status text-success' />
  } else if (status === 'sent') {
    return <SentIcon id={`icon_${id}`} className='pointer status text-success' />
  } else if (status === 'cancelled') {
    return <CancelledIcon id={`icon_${id}`} className='pointer status text-danger' />
  } else if (status === 'archived') {
    return <ArchivedIcon id={`icon_${id}`} className='pointer status text-primary' />
  } else {
    return <ProcessingIcon id={`icon_${id}`} className='pointer status text-secondary' />
  }
};

const ItemRow = ({ item }) => {
  const subTotal = getProduct(item.price_eur, item.price_cent, item.quantity);
  return (
    <Row className='ms-4'>
      <Col className='col-6 col-sm-3'>
        {item.name}
      </Col>
      <Col className='col-3 col-sm-2'>
        {`${getPriceStrNoCur(item.price_eur, item.price_cent)} x ${item.quantity}`}
      </Col>
      <Col className='col-3 col-sm-2'>
        {getPriceStr(subTotal.int, subTotal.fract, 'eur')}
      </Col>
    </Row>
  )
};

const OrderCard = ({ order, mode = 'user' }) => {
  const navigate = useNavigate();

  const date = new Date(order.created_at);
  const subTotal = order.itemsList.reduce((sum, item) => {
    const amount = getProduct(item.price_eur, item.price_cent, item.quantity);
    return getSum(sum.int, sum.fract, amount.int, amount.fract);
  }, { int: 0, fract: 0 });
  const deliveryCost = { int: 10, fract: 0 };
  const total = getSum(subTotal.int, subTotal.fract, deliveryCost.int, deliveryCost.fract);

  useEffect(() => {
    tippy(`#icon_${order.id}`, {
      content: `${i18n.t('tooltips.tippy_status')} ${i18n.t(`user_orders.${order.status}`)}`,
      theme: "secondary",
      placement: "top-end",
    });
    tippy('.date', {
      content: `${i18n.t('tooltips.tippy_date')} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
      theme: "secondary",
      placement: "top-end",
    });
    tippy('.user_name', {
      content: `${i18n.t('tooltips.tippy_user_name')}`,
      theme: "secondary",
      placement: "top-start",
    });

    if (order.status === 'archived' || order.status === 'cancelled') {
      document.getElementById(`order_${order.id}`).classList.add('bg-grey');
    } else {
      document.getElementById(`order_${order.id}`).classList.remove('bg-grey');
    }
  });

  const handleSwitchStatus = (e) => {
    const newStatus = e.target.text;
    const orderId = order.id;
    switchStatus(orderId, newStatus)
    .then((response) => {
      navigate('/orders')
    })
    .catch((err) => {
      toast.error(err.message);

  });
}

  return (
  <Container id={`order_${order.id}`} className='rounded shadow m-0 my-4 py-4'>
    {mode !== 'user' && <Row className='justify-content-between my-3'>
      <Col className='col-auto user_name'>
        {mode === 'admin' && <h4>{order.user_name}</h4>}
      </Col>
      <Col className='col-auto'>
        <DropdownOrderStatus handleSwitchStatus={handleSwitchStatus}/>
      </Col>
    </Row>}
      <Row className='justify-content-between'>
        <Col className='col-6'>
          <h4>{`Order #${order.id}`}</h4>
        </Col>
        <Col className='col-auto'>
          <div className='pointer date'>
            {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
          </div>
        </Col>
        <Col className='col-2 d-flex justify-content-end'>
          <StatusIcon id={order.id} status={order.status} />
        </Col>
      </Row>
      {order.itemsList.map((item) => {
        return <ItemRow key={item.id} item={item} />
      })}
      <Row className='ms-4 mt-2'>
        <Col className='col-6 col-sm-3'>
          {i18n.t('user_orders.delivery')}
        </Col>
        <Col className='col-3 col-sm-2'>
        </Col>
        <Col className='col-3 col-sm-2'>
          {getPriceStr(deliveryCost.int, deliveryCost.fract, 'eur')}
        </Col>
      </Row>
      <Row className='ms-1 mt-3'>
        {`Total: ${getPriceStr(total.int, total.fract, 'eur')}`}
      </Row>
      <ToastContainer />
    </Container>
  )
};

export default OrderCard;
