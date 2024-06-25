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
import i18n from '../../i18n';
import { toast, ToastContainer } from 'react-toastify';
import { actions as mainActions } from '../../slices/mainSlice.js';
import { alterItem, getStorage } from '../../utils/dbUtils.js';
import { ReactComponent as CloseBtn } from '../../assets/x.svg';
import { ReactComponent as SaveBtn } from '../../assets/check2.svg';

const EditRowPrice = ({ id, setDisplay, onHide }) => {
  const dispatch = useDispatch();
  const schemaPrice = yup.object({
    price_eur: yup.number().typeError(i18n.t('errors.number_type'))
    .min(0, i18n.t('errors.number_positive'))
    .integer(i18n.t('errors.number_integer'))
    .required(i18n.t('errors.empty_field')),
    price_cent: yup.number()
    .typeError(i18n.t('errors.number_type'))
    .min(0, i18n.t('errors.number_positive'))
    .max(99, i18n.t('errors.max99'))
    .integer(i18n.t('errors.number_integer')),
  });

  const handleSubmit = async (values) => {
    const cents = values.price_cent || 0;
    try {
      await alterItem(id, { price_eur: Number(values.price_eur), price_cent: Number(cents) });
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
      validationSchema={schemaPrice}
      onSubmit={handleSubmit}
      initialValues={{
        price_eur: '',
        price_cent: ''
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Row className='mt-3 mb-4 mx-2'>
          <Col className=''>
            <Form.Group>
              <FloatingLabel label='Euro' className='position-relative'>
                <Form.Control
                  autoFocus
                  type="text"
                  name="price_eur"
                  value={values.price_eur}
                  onChange={handleChange}
                  isInvalid={!!errors.price_eur}
                  />
                <Form.Control.Feedback type="invalid"
                className='position-absolute mb-4 text-nowrap'>
                  {errors.price_eur}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col className=''>
            <Form.Group>
              <FloatingLabel label='Cents' className='position-relative'>
                <Form.Control
                  type="text"
                  name="price_cent"
                  value={values.price_cent}
                  onChange={handleChange}
                  isInvalid={touched.price_cent && !!errors.price_cent}
                  />
                <Form.Control.Feedback type="invalid"
                className='position-absolute mb-4 text-nowrap'>
                  {errors.price_cent}
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
};

export default EditRowPrice;
