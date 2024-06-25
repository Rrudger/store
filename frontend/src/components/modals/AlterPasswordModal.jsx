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
import { updatePassword } from '../../utils/userUtils.js';
import { normalize } from '../../utils/utils.js';

const AlterPasswordModal = ({ id, show, close }) => {
  const dispatch = useDispatch();

  const schema = yup.object({
    old_password: yup.string().required(i18n.t('errors.empty_field')),
    password: yup.string().required(i18n.t('errors.empty_field'))
    .min(6, i18n.t('errors.min_6')),
    confirm_password: yup.string()
    .required(i18n.t('errors.empty_field'))
    .oneOf([yup.ref('password')], i18n.t('errors.password_match')),
  });

  const handleSubmit = async (values) => {
    document.getElementById('submitBtn').classList.add('disabled');
    updatePassword(id, trim(values.old_password, ' '), trim(values.password, ' '))
      .then(() => {
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
          {i18n.t('alter_modal.client.title_password')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            old_password: '',
            password: '',
            confirm_password: '',
          }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className='m-3'>

        <Row>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('alter_modal.client.old_password_label')}
              </p>
            </Form.Text>
            <Form.Control
              autoFocus
              id='old_password_input'
              type="password"
              name="old_password"
              value={values.old_password}
              onChange={handleChange}
              onFocus={(e) => e.target.type='text'}
              onBlur={(e) => e.target.type='password'}
              isInvalid={!!errors.old_password && !!touched.old_password}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.old_password}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('alter_modal.client.password_label')}
              </p>
            </Form.Text>
            <Form.Control
              id='password_input'
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onFocus={(e) => e.target.type='text'}
              onBlur={(e) => e.target.type='password'}
              isInvalid={!!errors.password && !!touched.password}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('alter_modal.client.confirm_password_label')}
              </p>
            </Form.Text>
            <Form.Control
              id='confirm_password_input'
              type="password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onFocus={(e) => e.target.type='text'}
              onBlur={(e) => e.target.type='password'}
              isInvalid={!!errors.confirm_password && !!touched.confirm_password}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirm_password}
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

export default AlterPasswordModal;
