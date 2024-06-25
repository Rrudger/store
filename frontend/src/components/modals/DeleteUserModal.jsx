import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import i18n from '../../i18n';

const DeleteUserModal = ({ show, close, deleteUser }) => {

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {i18n.t('delete_modal.client.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18n.t('delete_modal.client.text')}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="info">{i18n.t('buttons.cancel')}</Button>
        <Button onClick={deleteUser} variant="danger">{i18n.t('buttons.delete')}</Button>
      </Modal.Footer>
    </Modal>

)};

export default DeleteUserModal;
