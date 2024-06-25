import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import i18n from '../../i18n';

const DeleteModal = ({ modalHeight, showModal, handleClose, handleDelete }) => {
  return  (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header className='bg-info text-white' closeButton>
        <Modal.Title>{i18n.t('delete_modal.storage.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={ { height: modalHeight } }>
        {i18n.t('delete_modal.storage.text')}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete} variant="danger">{i18n.t('buttons.delete')}</Button>
        <Button onClick={handleClose} variant="info">{i18n.t('buttons.close')}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;
