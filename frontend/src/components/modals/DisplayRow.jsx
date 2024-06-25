import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { capitalize } from 'lodash';
import { ReactComponent as EditBtn } from '../../assets/pencil.svg';

const DisplayRow = ({ attr, val, setEdit }) => {
  return (
    <Row className='bg_change_trigger my-3 mx-2 align-items-center justify-content-between'>
      <Col className='bg_change_onhover rounded'>
        {capitalize(attr)}
      </Col>
      <Col>
        {val}
      </Col>
      <Col className='d-flex justify-content-end'>
        <Button variant='outline-info' onClick={setEdit}>
          <EditBtn />
        </Button>
      </Col>
    </Row>
  )
};

export default DisplayRow;
