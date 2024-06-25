import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Modal,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { capitalize, trim } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import DeleteModal from './DeleteItemModal.jsx';
import DisplayRow from './DisplayRow.jsx';
import EditRowPrice from './EditRowPrice.jsx';
import EditRow from './EditRow.jsx';
import { actions as mainActions } from '../../slices/mainSlice.js';
import { actions as userActions } from '../../slices/userSlice.js';
import { getPriceStr } from '../../utils/utils.js';
import { alterItem, deleteItem, getStorage } from '../../utils/dbUtils.js';

const routerEditRow = (id, attr, setDisplay, onHide) => {
  return attr === 'price' ?
  <EditRowPrice id={id} setDisplay={setDisplay} onHide={onHide} /> :
  <EditRow id={id} attr={attr} setDisplay={setDisplay} onHide={onHide} />
};

const FormRow = ({ id, attribute, value,  onHide }) => {
  const [mode, setMode] = useState('display');
  const setEdit = () => setMode('edit');
  const setDisplay = () => setMode('display');

  return mode === 'display' ?
  <DisplayRow attr={attribute} val={value} setEdit={setEdit} /> :
  routerEditRow(id, attribute, setDisplay, onHide)
}


const ModalEditItem = ({ show, onHide, id, item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [elemHeight, getHeight] = useState(0);
  useEffect(() => {
    if (item) {
      getHeight(document.getElementById('editItemModal').clientHeight);
    }
  })


  const [showDeleteModal, setDeleteModal] = useState(false);
  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      getStorage()
      .then((response) => {
        dispatch(mainActions.setGoodsList(response.data));
        handleClose();
        onHide();
      })
      .catch((err) => {
        toast.error(err.message);
      });
    } catch (err) {
      toast.error(err.response.data);
      if (err.response.status === 403) {
        setTimeout(() => {
          localStorage.clear();
          dispatch(userActions.logOut());
          navigate('./');
        }, "1500");
      }
    }
  }

  return !item ? <></> : (
    <>
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-light' closeButton>
        <Modal.Title className='text-primary'>{i18n.t('storage.modal_title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body id='editItemModal'>
        <FormRow id={id} attribute='name' value={item.name} onHide={onHide} />
        <FormRow id={id} attribute='price' value={getPriceStr(item['price_eur'], item['price_cent'], 'eur')} onHide={onHide} />
        <FormRow id={id} attribute='quantity' value={item.quantity} onHide={onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleShow} variant="danger">{i18n.t('buttons.delete')}</Button>
        <Button onClick={onHide} variant="info">{i18n.t('buttons.close')}</Button>
     </Modal.Footer>
    </Modal>
    <DeleteModal
    modalHeight={elemHeight}
    showModal={showDeleteModal}
    handleClose={handleClose}
    handleDelete={handleDelete}
    />
    <ToastContainer />
    </>
  )
}

export default ModalEditItem;
