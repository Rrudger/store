import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Col,
  Image,
  Row,
} from 'react-bootstrap';
import { capitalize } from 'lodash';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { getPriceStr, getProduct } from '../../utils/utils.js';
import { actions as cartActions } from '../../slices/cartSlice.js';

const ItemRow = ({ item }) => {
  const dispatch = useDispatch();

  const { int, fract } = getProduct(item.price_eur, item.price_cent, item.quantity);

  const addOne = () => {
    dispatch(cartActions.addItem({ id: item.id, quantity: 1 }));
  };

  const removeOne = () => {
    if (item.quantity > 1) {
      dispatch(cartActions.removeItem({ id: item.id, quantity: 1 }));
    } else {
      deleteItem(item.id)
    }
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(item.id));
  }

  return (
    <Row className="shadow rounded m-3">
      <Col className='d-flex align-items-center col-12 col-md-4'>
      <Row>
        <Col>
          <Image
          className="w-100"
          alt={`Image of item ${item.name}`}
          src={`http://localhost:5001/public/images/${item.id}.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="../../assets/image-not-found.jpg";
          }}
          />
        </Col>
        <Col className='d-block d-md-none pt-3'>
          <h3 className=''>
            {capitalize(item.name)}
          </h3>
        

        </Col>
        <Col className='d-block d-md-none col-1 mt-3 me-2'>
          <TrashIcon onClick={deleteItem} className='me-3 trash_icon trash_icon_sm'/>
        </Col>
      </Row>
      </Col>
      <Col className='col-12 col-md-8 ps-4'>
        <Row className='d-none d-md-block h-50 align-items-center my-3'>
        <div className='d-flex justify-content-between'>
        <h3 className=''>
            {capitalize(item.name)}
          </h3>
          <TrashIcon onClick={deleteItem} className='me-3 trash_icon'/>
          </div>

          <div className='d-block'>
            description
          </div>


        </Row>

        <Row className='h-50 align-items-center my-3'>
          <Col className='d-flex align-items-center justify-content-start'>
            {getPriceStr(item.price_eur, item.price_cent, 'eur')}
          </Col>
          <Col className='d-flex justify-content-start'>
            <ButtonGroup aria-label="+- buttons">
              <Button onClick={removeOne} className='text-primary' variant="secondary">-</Button>
              <Button className='text-primary' disabled variant="secondary">{item.quantity}</Button>
              <Button onClick={addOne} className='text-primary' variant="secondary">+</Button>
            </ButtonGroup>
          </Col>
          <Col className='d-flex align-items-center justify-content-start'>
            {getPriceStr(int, fract, 'eur')}
          </Col>
        </Row>

      </Col>
      <Col className='d-none d-md-block col-1'>


      </Col>
    </Row>
  )
}



export default ItemRow;
