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
import { toast, ToastContainer } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import { actions as mainActions } from '../../slices/mainSlice.js';
import { addItem, getStorage } from '../../utils/dbUtils.js';

const ModalAddItem = ({ show, onHide }) => {
  const dispatch = useDispatch();

  const schema = yup.object({
    name: yup.string().required(i18n.t('errors.empty_field')),
    quantity: yup.number().typeError(i18n.t('errors.number_type'))
    .min(0, i18n.t('errors.number_positive'))
    .integer(i18n.t('errors.number_integer')),
    price_eur: yup.number().typeError(i18n.t('errors.number_type'))
    .min(0, i18n.t('errors.number_positive'))
    .integer(i18n.t('errors.number_integer')),
    price_cent: yup.number()
    .typeError(i18n.t('errors.number_type'))
    .min(0, i18n.t('errors.number_positive'))
    .max(99, i18n.t('errors.max99'))
    .integer(i18n.t('errors.number_integer')),
  });

  const handleSubmit = async (values) => {
    document.getElementById('submitBtn').classList.add('disabled');
    addItem(values)
      .then(() => {
        toast.success(i18n.t('add_modal.storage.success_toast'));
        getStorage()
        .then((response) => {
          dispatch(mainActions.setGoodsList(response.data));
          onHide();
        })
        .catch((err) => {
          toast.error(err.message);
        });
      })
      .catch((err) => {
        toast.error(err.response.data);
        document.getElementById('submitBtn').classList.remove('disabled');
      })
  }

  return  (
    <>
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-info text-white' closeButton>
        <Modal.Title>{i18n.t('add_modal.storage.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          price_eur: '',
          price_cent: '',
          quantity: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className='m-3'>

        <Row>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('add_modal.storage.name')}
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

          <Row>
          <Col>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('add_modal.storage.price_eur')}
              </p>
            </Form.Text>
            <Form.Control
              id='price_eur_input'
              type="text"
              name="price_eur"
              value={values.price_eur}
              onChange={handleChange}
              isInvalid={!!errors.price_eur}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.price_eur}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="pt-3 mb-3">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('add_modal.storage.price_cent')}
              </p>
            </Form.Text>
            <Form.Control
              id='price_cent_input'
              type="text"
              name="price_cent"
              value={values.price_cent}
              onChange={handleChange}
              isInvalid={!!errors.price_cent}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.price_cent}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          </Row>

          <Row>
          <Form.Group className="pt-3 mb-3 w-50">
            <Form.Text className='d-flex justify-content-between me-2'>
              <p className='ps-2 mb-1 d-inline text-primary'>
                {i18n.t('add_modal.storage.quantity')}
              </p>
            </Form.Text>
            <Form.Control
              id='quantity_input'
              type="text"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
              className='mt-2'
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
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
                variant="primary"
                type="submit"
                className='me-3 w-100 text-secondary'>
                  {i18n.t('buttons.add')}
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
}
/*<Button
onClick={onHide}
variant="info"
className="w-100">
  {i18n.t('buttons.close')}
</Button>
*/
export default ModalAddItem;
