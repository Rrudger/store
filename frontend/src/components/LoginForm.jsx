import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Form,
  Button,
  CloseButton,
  FloatingLabel,
} from 'react-bootstrap';
import i18n from '../i18n';
import { trim, upperCase } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { ReactComponent as CloseBtn } from '../assets/x.svg';
import { ReactComponent as Eye } from '../assets/eye.svg';
import { ReactComponent as EyeSlash } from '../assets/eye-slash.svg';
import { actions } from '../slices/userSlice.js';
import { normalize, setLocalStorage } from '../utils/utils.js'
import { loginUser } from '../utils/userUtils.js'

const LoginForm = ({ show, handleClose }) => {
  useEffect(() => {
    document.getElementById('log_in_btn').classList.remove('active_log_in')
  });
  const dispatch = useDispatch();

  const [hide, hidePassword] = useState(true);
  const handleTogglePas = (e) => {
    const input = document.getElementById('password_input');
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
    hide ? hidePassword(false) : hidePassword(true);
    input.focus();
  }

  const { Formik } = formik;
  const schema = yup.object().shape({
    username: yup.string().required(i18n.t('errors.name_required')),
    password: yup.string().required(i18n.t('errors.password_required')),
  });

  const testResponse = true;

  const handleSubmit = (values, { resetForm }) => {
    document.getElementById('submitBtn').classList.add('disabled');
    loginUser(normalize(values.username), trim(values.password, ' '))
      .then((response) => {
        setLocalStorage(response.data.token, response.data.id, response.data.role, values.username);
        dispatch(actions.setLogged({ role: response.data.role, name: values.username, id: response.data.id }))
        handleClose();
        window.open('./', '_self')
      })
      .catch((err) => {
        toast.error(err.response.data);
        resetForm();
        document.getElementById('submitBtn').classList.remove('disabled');
      })
    //handleClose();
  };

  return (
      <Modal show={show} onHide={handleClose}>
        <h1 className='d-flex justify-content-between mb-4 bg-primary text-secondary rounded p-3'>
          {i18n.t('login_form.title_and_submit')}
          <CloseBtn onClick={handleClose} className='modal_close_btn pointer pe-auto' />
        </h1>
        <Modal.Body>

        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className='m-3'>

            <Form.Group className="pt-3 mb-3">
              <Form.Text className='d-flex justify-content-between me-2'>
                <p className='ps-2 mb-1 d-inline text-primary'>
                  {i18n.t('login_form.username')}
                </p>
                <p className='d-inline mb-1'>
                  {i18n.t('login_form.no_acc_text')}
                  <a className='link-primary' href='/signUp'>
                    {i18n.t('login_form.no_acc_link')}
                  </a>
                </p>
              </Form.Text>
              <Form.Control
                id='username_input'
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                className='mt-2'
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 pt-3 position-relative">
              <Form.Text>
                <p className='ps-2 mb-1 text-primary'>
                  {i18n.t('login_form.password')}
                </p>
              </Form.Text>
              <Form.Control
                id="password_input"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                className='mt-2'
              />
              {!errors.password && <span onClick={handleTogglePas} className='position-absolute top-50 start-100 translate-midle'>
                {hide ? <EyeSlash className='eye-icon'/> : <Eye className='eye-icon'/>}
              </span>}
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='d-flex justify-content-center mt-4'>
              <Button
                id='submitBtn'
                variant="primary"
                size='lg'
                className='text-secondary text-uppercase fw-bold px-4 shadow rounded-pill'
                type="submit"
                >
                {i18n.t('login_form.title_and_submit')}
              </Button>
            </Form.Group>

          </Form>
        )}
      </Formik>
        </Modal.Body>
        <ToastContainer />
      </Modal>
  )
}

export default LoginForm;
