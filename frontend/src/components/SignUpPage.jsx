import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import i18n from '../i18n';
import { trim } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { actions } from '../slices/userSlice.js';
import { normalize, setLocalStorage } from '../utils/utils.js';
import { singUp } from '../utils/userUtils.js';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('username_input').focus()
  });

  const { Formik } = formik;
  const schema = yup.object().shape({
    username: yup.string().required(i18n.t('errors.name_required')),
    password: yup.string().required(i18n.t('errors.password_required'))
    .min(6, i18n.t('errors.min_6')),
  });

  const handleSubmit = (values, { resetForm }) => {
    document.getElementById('submitBtn').classList.add('disabled');
    singUp(normalize(values.username), trim(values.password, ' '))
    .then((response) => {
        setLocalStorage(response.data.token, response.data.id, 'user', values.username);
        dispatch(actions.setLogged({ role: 'user', name: values.username, id: response.data.id }));
        toast.success(i18n.t('signup_form.success_registration'))
        navigate(`/`)
      })
      .catch((err) => {
        toast.error(err.response.data);
        resetForm();
        document.getElementById('submitBtn').classList.remove('disabled');
      })
  }

  return (
<>
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        username: '',
        password: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3 d-flex justify-content-center">
            <Col sm="12" md="6">
            <h2 className='d-flex mb-4 text-primary rounded p-3'>
              {i18n.t('signup_form.submit_title')}
            </h2>
            <Form.Group className="pt-3 px-2 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-2 text-primary'>
                {i18n.t('signup_form.username')}
              </p>
            </Form.Text>
              <Form.Control
                id='username_input'
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="pt-3 px-2 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-2 text-primary'>
                {i18n.t('signup_form.password')}
              </p>
              </Form.Text>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onFocus={(e) => e.target.type='text'}
                onBlur={(e) => e.target.type='password'}
                isInvalid={!!errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button id='submitBtn' className='mx-2 text-secondary' type="submit">
              {i18n.t('signup_form.submit_title')}
            </Button>
            </Col>
          </Row>


        </Form>
      )}

    </Formik>
    <ToastContainer />
    </>

  );
}

export default SignUpPage;
