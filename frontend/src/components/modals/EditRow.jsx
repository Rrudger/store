import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { capitalize } from 'lodash';
import i18n from '../../i18n';
import { toast, ToastContainer } from 'react-toastify';
import { actions as mainActions } from '../../slices/mainSlice.js';
import { alterItem, getStorage } from '../../utils/dbUtils.js';
import { ReactComponent as CloseBtn } from '../../assets/x.svg';
import { ReactComponent as SaveBtn } from '../../assets/check2.svg';

const EditRow = ({ id, attr, setDisplay, onHide }) => {
  const dispatch = useDispatch();
  const schemaName = yup.object().shape({
    field: yup.string().required(i18n.t('errors.empty_field'))
  });
  const schemaQuantity = yup.object().shape({
    field: yup.number()
    .typeError(i18n.t('errors.number_type'))
    .min(0, i18n.t('errors.number_positive'))
    .integer(i18n.t('errors.number_integer'))
    .required(i18n.t('errors.empty_field'))
  });

  const handleSubmit = async (values) => {
    const value = attr === 'quantity' ? Number(values.field) : values.field;
    try {
      await alterItem(id, { [attr]: value });
      getStorage()
      .then((response) => {
        dispatch(mainActions.setGoodsList(response.data));
        onHide();
      })
      .catch((err) => {
        toast.error(err.message);
      });
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  return (
    <>
    <Formik
      validationSchema={attr === 'name' ? schemaName : schemaQuantity}
      onSubmit={handleSubmit}
      initialValues={{
        field: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Row className='mt-3 mb-4 mx-2'>
          <Col className=''>
            <Form.Group>
              <FloatingLabel label={capitalize(attr)} className='position-relative'>
                <Form.Control
                  autoFocus
                  type="text"
                  name="field"
                  value={values.field}
                  onChange={handleChange}
                  isInvalid={!!errors.field}
                  />
                <Form.Control.Feedback type="invalid"
                className='position-absolute mb-4 text-nowrap'>
                  {errors.field}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col className='col-auto ps-0 d-flex align-items-center'>
            <Button type='submit' variant='outline-danger'>
              <SaveBtn />
            </Button>
          </Col>
          <Col className='col-auto ps-0 d-flex align-items-center'>
            <Button variant='outline-info' onClick={setDisplay}>
              <CloseBtn className='closeBtn16' />
            </Button>
          </Col>
        </Row>
      </Form>
    )}
    </Formik>
    <ToastContainer />
    </>

  )
}

export default EditRow;
