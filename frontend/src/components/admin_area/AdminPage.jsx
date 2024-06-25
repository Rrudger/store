import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import i18n from '../../i18n';
import '../../css/animation/animationAdminPage.css';

const SectionBtn = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div id={`${type}Btn`} className={`shadow animation-container slide-${type}-trigger position-relative mb-3`}>
      <div className={`animation-front ${type}-btn position-absolute rounded`}></div>
      <Button onClick={() => navigate(`/${type}`)} className='bg-secondary border-0 text-primary animation-back position-absolute'>
        <h2>
          {i18n.t(`buttons.${type}`)}
        </h2>
      </Button>
    </div>
  )
}

const AdminPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = useSelector((state) => state.userState.role);
  useEffect(() => {
    if (!token || role === 'user') {
      navigate('/');
    }
  })

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col className='col-12 d-flex justify-content-center'>
          <SectionBtn type='storage' />
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='col-md-3 col-sm-12 d-flex justify-content-center'>
          <SectionBtn type='users' />
        </Col>
        <Col className='col-md-3 col-sm-12 d-flex justify-content-center'>
          <SectionBtn type='orders' />
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage;
