import React from 'react';
import {
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { capitalize } from 'lodash';

const UserCard = ({ name, changePassword, changeName, deleteAcc }) => {
  return (
    <>
    <Row className='mt-4'>
      <Col>
        <h4>
          {capitalize(name)}
        </h4>
      </Col>
      <Col xs='6' sm='2' className='d-grid gap-2 me-3'>
        <Button onClick={changeName} className='text-nowrap'>
          {i18n.t('client_area.changeNameBtn')}
        </Button>
      </Col>
    </Row>
    <Row className='my-4'>
      <Col>
        <h4>
          ******
        </h4>
      </Col>
      <Col xs='6' sm='2' className='d-grid gap-2 me-3'>
        <Button onClick={changePassword} className='text-nowrap'>
          {i18n.t('client_area.changePasswordBtn')}
        </Button>
      </Col>
    </Row>
    <Row className="my-4 d-grid gap-2">
      <Col xs='6'>
        <Button onClick={deleteAcc} variant="outline-danger" className='text-nowrap'>
          {i18n.t('client_area.deleteAccBtn')}
        </Button>
      </Col>
    </Row>
    </>
  )
}

export default UserCard;
