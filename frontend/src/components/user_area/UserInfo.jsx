import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  Button,
  Row,
} from 'react-bootstrap';
import UserCard from './UserCard.jsx';
import DeleteUserModal from '../modals/DeleteUserModal.jsx';
import AlterNameModal from '../modals/AlterNameModal.jsx';
import AlterPasswordModal from '../modals/AlterPasswordModal.jsx';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import i18n from '../../i18n';
import { capitalize } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { actions as userActions} from '../../slices/userSlice.js';
import { changeUserAttr, deleteAccount } from '../../utils/userUtils.js';

const UserInfo = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.userState.name);
  const id = useSelector((state) => state.userState.id);



  const [openAccInfo, setAccInfo] = useState(false);
  const decoratedOnClick = useAccordionButton(0, () =>
    {
      openAccInfo ? setAccInfo(false) : setAccInfo(true);
    },
  );

  const [showChangeName, setChangeName] = useState(false);
  const handleCloseChangeName = () => setChangeName(false);
  const handleShowChangeName = () => setChangeName(true);

  const [showChangePas, setChangePas] = useState(false);
  const handleCloseChangePas = () => setChangePas(false);
  const handleShowChangePas = () => setChangePas(true);


  const [showDelete, setDeleteModal] = useState(false);
  const handleCloseDelete = () => setDeleteModal(false);
  const handleShowDelete = () => setDeleteModal(true);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(id);
      toast.success(i18n.t('client_area.deleteSuccessMessage'));
      handleCloseDelete();
      setTimeout(() => {
        localStorage.clear();
        dispatch(userActions.logOut());
        window.open('./', '_self');
      }, "1500");
    } catch (err) {
      toast.error(err.message)
    }
  }


  return (
    <Row>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={decoratedOnClick}>
            {!openAccInfo && <h3>
              {capitalize(name)}
            </h3>}
          </Accordion.Header>
          <Accordion.Body>
            <UserCard
            name={name}
            changePassword={handleShowChangePas}
            changeName={handleShowChangeName}
            deleteAcc={handleShowDelete}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <AlterNameModal
      id={id}
      show={showChangeName}
      close={handleCloseChangeName} />
      <AlterPasswordModal
      id={id}
      show={showChangePas}
      close={handleCloseChangePas} />
      <DeleteUserModal show={showDelete} close={handleCloseDelete} deleteUser={handleDeleteAccount} />
      <ToastContainer />
    </Row>
);
}

export default UserInfo;
