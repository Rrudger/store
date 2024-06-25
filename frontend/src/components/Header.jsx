import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Col,
  Navbar,
  ButtonGroup,
  ToggleButton,
  Dropdown,
  DropdownButton,
  Button,
  Image,
} from 'react-bootstrap';
import { ReactComponent as CartBtn } from '../assets/cart.svg';
import { ReactComponent as UserAreaBtn } from '../assets/person-fill.svg';
import { ReactComponent as AdminIcon } from '../assets/user-admin.svg';
import { ReactComponent as ExitBtn } from '../assets/box-arrow-left.svg';
import '../css/animation/animationHeader.css';
import '../css/animation/animationLogInBtn.css';

import { uniqueId } from 'lodash';
import i18n from '../i18n';
import { actions as mainActions} from '../slices/mainSlice.js';
import { actions as userActions} from '../slices/userSlice.js';
import { actions as cartActions} from '../slices/cartSlice.js';
import LoginForm from './LoginForm.jsx';
import { logOut } from '../utils/utils.js';

const UserIcon = () => {
  const userName = useSelector((state) => state.userState.name);
  const role = useSelector((state) => state.userState.role);
  return (
    role === 'user' ? <div className='text-capitalize fw-bold'>
      {userName.slice(0,2)}
    </div> : <AdminIcon />

  )
}

const Header = () => {
  const dispatch = useDispatch();

  const logged = useSelector((state) => state.userState.logged);
  const role = useSelector((state) => state.userState.role);
  const itemsNum = useSelector((state) => state.cartState.itemsNum);

  if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
  const lang = localStorage.getItem('lang');
  const langList = useSelector((state) => state.mainState.langList);
  const [curLang, setLang] = useState(lang);
  const handleChangeLang = (lang) => (e) => {
    const newLang = lang;
    setLang(newLang);
    localStorage.setItem('lang', lang);
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleOpenClientArea = () => {
    if (logged) {
      role === 'user' ? window.open('./clientArea', '_self') : window.open('./admin', '_self')
    } else {
      openLoginModal()
    }
  };

  const openLoginModal = () => {
    setShowModal(true);
    setTimeout(() => {
      document.getElementById('username_input').focus();
    }, 500);
  };

  const handleLogOut = () => {
    logOut();
    dispatch(userActions.logOut());
    window.open('./', '_self');
  };

  return (
    <>
    <Navbar id='header' className="shadow-lg navbar-expand-lg rounded-bottom py-3 py-sm-2 mb-4">
      <Container>
        <Navbar.Brand href="/">
          <h1 id='header_title' className='text-primary mb-0'>
            {i18n.t('header.title')}
          </h1>
        </Navbar.Brand>

        <ButtonGroup className='shadow'>
          {logged &&
          <Button onClick={handleLogOut} variant='outline-primary'>
            <ExitBtn className='header_btns'/>
          </Button>
        }
          <Button id='log_in_btn' onClick={handleOpenClientArea} data-bs-toggle="modal" data-bs-target="#login_modal" variant='outline-primary'>
            {logged ? <UserIcon /> : <UserAreaBtn />}
          </Button>
          {itemsNum !== 0 &&
            <Button onClick={()=> window.open('./cart', '_self')} variant='outline-primary'>
              <CartBtn className='header_btns'/>
              <span className="z-3 position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-primary text-secondary">
                {itemsNum}
                <span className="visually-hidden">{i18n.t('header.badge')}</span>
              </span>
            </Button>
          }
          <DropdownButton as={ButtonGroup} variant='outline-primary' title={curLang}>
            <Dropdown.Item onClick={handleChangeLang(curLang === 'en' ? 'ru' : 'en')}>{curLang === 'en' ? 'ru' : 'en'}</Dropdown.Item>
          </DropdownButton>

        </ButtonGroup>

      </Container>

    </Navbar>
    <LoginForm show={showModal} handleClose={handleClose} />


    </>
  );
};

export default Header;
