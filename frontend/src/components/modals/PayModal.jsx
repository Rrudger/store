import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import i18n from '../../i18n';

const PayModal = ({ show, close, cart, total }) => {
  console.log(cart)

  const postOrder = () => {
    console.log('achora un passo')
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          title
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        body
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="info">{i18n.t('buttons.cancel')}</Button>
        <Button onClick={postOrder} variant="danger">{i18n.t('buttons.delete')}</Button>
      </Modal.Footer>
    </Modal>

)};

export default PayModal;
