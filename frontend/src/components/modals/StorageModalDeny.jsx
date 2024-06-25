import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import i18n from '../../i18n';

const ModalAccessDenied = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className='my-4'>
        {i18n.t('storage.modal_denied_text')}
      </Modal.Body>
      <Modal.Footer>
       <Button onClick={onHide} variant="info">{i18n.t('buttons.close')}</Button>
     </Modal.Footer>
    </Modal>
  )
}

export default ModalAccessDenied;
