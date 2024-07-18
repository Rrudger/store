import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Modal,
  Row,
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../utils/userUtils.js';

const UserCard = ({ id, name, created_at, activeOrders, archivedOrders } ) => {
  const navigate = useNavigate();

  const role = useSelector((state) => state.userState.role);

  const date = new Date(created_at);
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(id);
      toast.success(i18n.t('admin.deleteSuccessMessage'));
      handleClose();
      setTimeout(() => {
        navigate('/admin');
      }, "1500");
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  return (
    <Row className='border border-2 border-primary rounded shadow'>
      <Row className='mt-4'>
        <h4>
          {`Name: ${name}`}
        </h4>
      </Row>
      <Row className='mt-4'>
        <div>
          {`Created at: ${date.getDate()}/${month}/${date.getFullYear()}`}
        </div>
      </Row>
      <Row className='mt-4'>
        <div>
          {`Active orders:  ${activeOrders}`}
        </div>
      </Row>
      <Row className='mt-4'>
        <div>
          {`Archived orders:  ${archivedOrders}`}
        </div>
      </Row>

      <Row className="my-4 d-grid gap-2">
        <Col xs='6'>
          <Button onClick={handleShow} variant="outline-danger" className={
            role === 'superadmin' ? 'text-nowrap' : 'text-nowrap disabled'
          }>
            {i18n.t('admin.deleteAccBtn')}
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{i18n.t('admin.modal_acc_title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {i18n.t('admin.modal_acc_body')}
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={handleClose} variant="info">{i18n.t('admin.modal_acc_cancel_btn')}</Button>
         <Button onClick={handleDeleteAccount} variant="danger">{i18n.t('admin.modal_acc_delete_btn')}</Button>
       </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Row>
  )
}

export default UserCard;
