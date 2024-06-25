import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import i18n from '../../i18n';
import { trim } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import { actions as userActions } from '../../slices/userSlice.js';
import { changeUserAttr } from '../../utils/userUtils.js';
import { normalize } from '../../utils/utils.js';

const AlterNameModal = ({ id, show, close }) => {
  const dispatch = useDispatch();

  const schema = yup.object({
    name: yup.string().required(i18n.t('errors.empty_field')),
  });

  const handleSubmit = async (values) => {
    document.getElementById('submitBtn').classList.add('disabled');
    changeUserAttr(id, 'name', normalize(values.name))
      .then(() => {
        dispatch(userActions.alterName(normalize(values.name)));
        localStorage.setItem('userName', normalize(values.name))
        close();
      })
      .catch((err) => {
        toast.error(err.response.data || err.message);
        document.getElementById('submitBtn').classList.remove('disabled');
      })
  }

  return  (
    <>
    <Modal show={show} onHide={close}>
      <Modal.Header className='bg-info text-white' closeButton>
        <Modal.Title>
          {i18n.t('alter_modal.client.title_name')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
          }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className='m-3'>

        <Row>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('alter_modal.client.name_label')}
              </p>
            </Form.Text>
            <Form.Control
              autoFocus
              id='name_input'
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className='mt-4'>
          <Row>
            <Col className='col-6'>
            </Col>
            <Col className='col-6'>
              <Button
                id='submitBtn'
                variant="info"
                type="submit"
                className='me-3 w-100'>
                  {i18n.t('buttons.save')}
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    )}
    </Formik>
    </Modal.Body>
    </Modal>
    <ToastContainer />
    </>
  )
};

export default AlterNameModal;
