import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  Image,
} from 'react-bootstrap';
import i18n from '../i18n';
import { uniqueId, capitalize } from 'lodash';
import { actions as cartActions } from '../slices/cartSlice.js';
import { getPriceStr } from '../utils/utils.js'

const GoodCard = ({ id, item }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const addOne = () => setQuantity(quantity + 1);
  const removeOne = () => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);

  const handleAdd = (e) => {
    setQuantity(1);
    dispatch(cartActions.addItem({ id: e.target.id, quantity: quantity }));
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{capitalize(item.name)}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">add description</Card.Subtitle>
        <Image
        className="card-img-top mb-2"
        alt={`Image of item ${item}`}
        src={`http://localhost:5001/public/images/${id}.png`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src="./assets/image-not-found.jpg";
        }}
        />
        <Card.Text>
          {getPriceStr(item.price_eur, item.price_cent, 'eur')}
        </Card.Text>
        <Row>
          <Col className='col-6'>
            <ButtonGroup aria-label="+- buttons">
              <Button onClick={removeOne} className='text-primary' variant="secondary">-</Button>
              <Button className='text-primary' disabled variant="secondary">{quantity}</Button>
              <Button onClick={addOne} className='text-primary' variant="secondary">+</Button>
            </ButtonGroup>
          </Col>
          <Col>
            <Button id={id} onClick={handleAdd} variant="primary" className='text-secondary'>
              {i18n.t('main_page.add_in_cart')}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

const Main = () => {
  const goodsList = useSelector((state) => state.mainState.goodsList);
  const role = useSelector((state) => state.userState.role);

  return (
    <Container>
      <Row className='row-cols-md-4 row-cols-sm-1'>
        {Object.keys(goodsList).map((key) => {
          return (
            <Col key={uniqueId()} className='mb-3'>
              <GoodCard
              id={key}
              item={goodsList[key]}
              />
            </Col>
          )
        })}
      </Row>
    </Container>
  );
};

export default Main;
