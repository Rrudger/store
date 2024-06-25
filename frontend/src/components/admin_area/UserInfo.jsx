import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { actions as adminActions} from '../../slices/adminSlice.js';
import { deleteAccount, getUserInfo } from '../../utils/userUtils.js';

const UserCard = ({ id, name, created_at }) => {
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
          {`Active orders: `}
        </div>
      </Row>
      <Row className='mt-4'>
        <div>
          {`Archived orders: `}
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
    </Row>
  )
}

const UserInfo = () => {
  const dispatch = useDispatch();

  const id = localStorage.getItem('current_user');
  const currentUser = useSelector((state) => state.adminState.current_user);

  getUserInfo(id)
  .then((response) => {
    dispatch(adminActions.setCurrentUser(response.data));
  })
  .catch((err) => {
    toast.error(err.message);
  });


  return (
    <Container>
      {currentUser &&
        <UserCard id={id}
        name={currentUser.name}
        created_at={currentUser.created_at}
        />
      }
      <ToastContainer />
    </Container>
  );
};

export default UserInfo;
