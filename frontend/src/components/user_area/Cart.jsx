import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import {
   Button,
   Col,
   Container,
   Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { isEmpty } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { actions as cartActions } from '../../slices/cartSlice.js';
import { actions as userActions } from '../../slices/userSlice.js';
import ItemRow from './ItemRow.jsx';
import PayModal from '../modals/PayModal.jsx';
import { getSum, getProduct, getPriceStr, logOut } from '../../utils/utils.js';
import { postOrder } from '../../utils/dbUtils.js';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged = useSelector((state) => state.userState.logged);
  const cart = useSelector((state) => state.cartState.cart);
  const goodsList = useSelector((state) => state.mainState.goodsList);
  const subTotal = isEmpty(goodsList) ? 0 : cart.reduce((sum, item) => {
    const curItem = goodsList[item.id];
    const amount = getProduct(curItem.price_eur, curItem.price_cent, item.quantity);
    return getSum(sum.int, sum.fract, amount.int, amount.fract);
  }, { int: 0, fract: 0 })
  const deliveryCost = { int: 10, fract: 0 };
  const total = getSum(subTotal.int, subTotal.fract, deliveryCost.int, deliveryCost.fract);

  const id = useSelector((state) => state.userState.id);
  const orderPaid = 'paid';
  const payAndPostOrder = async () => {
    if (logged) {
    try {
      await postOrder(id, cart, orderPaid);
      toast.success(i18n.t('cart.success_toast'));
      setTimeout(() => {
        dispatch(cartActions.cleanCart())
        navigate('/');
      }, "1000");
    } catch (err) {
      toast.error(err.response.data);
      if (err.response.status) {
        setTimeout(() => {
          logOut();
          dispatch(userActions.logOut());
          navigate('/');
        }, "1000");
      }
    }
  } else {
    toast.warning(i18n.t('cart.warninig_toast'), {
      position: 'top-center'
    });
    document.getElementById('log_in_btn').classList.add('active_log_in')
  }
  }

  if (cart.length === 0) {
    setTimeout(() => {
      navigate('/');
    }, 1000);

    return (
      <Container className='shadow-lg bg-secondary text-primary rounded'>
        <h2 className='m-4'>
          {i18n.t('cart.empty')}
        </h2>
      </Container>
    )
  }

  return (
    <Container className='shadow-lg rounded'>
      <Row>
        <Col className='col-12 col-md-9 order-2 order-md-1'>
      {!isEmpty(goodsList) && cart.map((item) => {
        const product = goodsList[item.id];
        const itemData = {
          id: item.id,
          quantity: item.quantity,
          name: product.name,
          price_eur: product.price_eur,
          price_cent: product.price_cent,
        }
        return (
          <ItemRow key={item.id} item={itemData} />
        )}
      )}
        </Col>

        <Col className="col-12 col-md-3 order-1 order-md-2">
          <Row className="shadow rounded m-3 mx-0">
          <Row className='pe-0 pt-3'>
            <Col className='align-items-center justify-content-start'>
              <h5>
                {i18n.t('cart.subtotal')}
              </h5>
            </Col>
            <Col className='text-end'>
              {getPriceStr(subTotal.int, subTotal.fract, 'eur')}
            </Col>
          </Row>
          <Row className='pe-0 pt-3'>
            <Col className='align-items-center justify-content-start'>
              <h5 className='text-nowrap'>
                {i18n.t('cart.delivery')}
              </h5>
            </Col>
            <Col className='text-end'>
              {getPriceStr(deliveryCost.int, deliveryCost.fract, 'eur')}
            </Col>
          </Row>
          <Row className='px-0 pt-3 m-0 bg-secondary text-primary'>
            <Col className='align-items-center justify-content-start'>
              <h5 className='text-nowrap'>
                {i18n.t('cart.total')}
              </h5>
            </Col>
            <Col className='text-end me-2'>
              {getPriceStr(total.int, total.fract, 'eur')}
            </Col>
          </Row>
          <Row className='my-4 mx-0'>
            <Button onClick={payAndPostOrder} variant='primary'>
              {i18n.t('buttons.checkout')}
            </Button>
          </Row>
          </Row>


        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )

};

export default Cart;
