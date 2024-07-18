import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
} from 'react-bootstrap';
import i18n from '../../i18n';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '../../css/tippy_themes.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { slice } from 'lodash';
import { getPriceStr, sortBy } from '../../utils/utils.js';
import ModalEditItem from '../modals/StorageModal.jsx';
import ModalAddItem from '../modals/AddItemModal.jsx';
import ModalAccessDenied from '../modals/StorageModalDeny.jsx';
import { ReactComponent as AddBtn } from '../../assets/clipboard-plus.svg';

const PaginationStorage = ({ current, setCurrent, pagesNum }) => {
  return (
    <Pagination id='storage_pagination'>
     <Pagination.First onClick={()=>setCurrent(1)} className={current === 1 ? 'disabled' : ''} />
     <Pagination.Prev onClick={()=>setCurrent(current - 1)} className={current === 1 ? 'disabled' : ''} />

     <Pagination.Item>{current}</Pagination.Item>

     <Pagination.Next onClick={()=>setCurrent(current + 1)} className={current === pagesNum ? 'disabled' : ''} />
     <Pagination.Last onClick={()=>setCurrent(pagesNum)} className={current === pagesNum ? 'disabled' : ''} />
   </Pagination>
  )
}

const Storage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = useSelector((state) => state.userState.role);
  const goodsList = useSelector((state) => state.mainState.goodsList);
  const [sortedBy, setSortedBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const sortedKeys = sortBy(sortedBy, order, goodsList);

  const [currentPage, setCurrent] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(20);
  const itemsNumber = sortedKeys.length;
  const pagesNum = itemsNumber <= itemsOnPage ? 1 : Math.ceil(itemsNumber / itemsOnPage);
  const startIndex = currentPage === 1 ? 0 : (currentPage -1) * itemsOnPage;
  const endIndex = (startIndex + itemsOnPage) > sortedKeys.length ? sortedKeys.length : startIndex + itemsOnPage;

  const handleSort = (attr) => () => {
    if (attr === sortedBy) {
      order === 'asc' ? setOrder('des') : setOrder('asc');
    } else {
      setOrder('asc');
    }
    setSortedBy(attr);
  };

  useEffect(() => {
    if (!token || role === 'user') {
      navigate('/');
    };

    tippy('.storage-sort', {
      content: `${i18n.t('tooltips.storage')} ${order === 'asc'? '\u2193' : '\u2191'}`,
      theme: "primary",
      placement: "top-start",
    });

    tippy('#addBtn', {
      content: i18n.t('tooltips.add_item'),
      theme: "primary",
      placement: "right",
    });
  });

  const [viewedItem, setViewedItem] = useState(null);
  const [editModal, showEditModal] = useState(false);
  const handleCloseEdit = () => {
    setViewedItem(null);
    showEditModal(false);
  };
  const handleShowEditModal = () => showEditModal(true);
  const handleShowModal = (e) => {
    setViewedItem(e.target.parentNode.id);
    handleShowEditModal();
  };

  const [addModal, showAddModal] = useState(false);
  const handleCloseAdd = () => showAddModal(false);
  const handleShowAdd = () => showAddModal(true);

  const switchItemsOnPage = (e) => {
    setItemsOnPage(e.target.text);
    setCurrent(1);
  };

  const schema = yup.number().positive();
  const goBtn = document.getElementById('goBtn');
  const changeGoInput = (e) => {
    const page = e.target.value;
    schema.validate(page)
    .then(valid => {
      if (valid > pagesNum) {
        e.target.value = pagesNum;
      }
      goBtn.classList.remove('disabled')
    })
    .catch(() => {
      goBtn.classList.add('disabled');
      e.target.value = '';
    });
  };

  const switchPageGo = (e) => {
    const page = document.getElementById('goInput').value
    setCurrent(page)
  }






  return (
    <Container>
      <Row className="my-4">
        <Col className='col-1'>
        <Button id='addBtn' onClick={handleShowAdd} size="lg" variant="outline-primary" className='pb-2 pt-1'>
          <AddBtn />
        </Button>
        </Col>
      </Row>
      <Row>
      <Table responsive="sm" className='table-hover'>
        <thead>
          <tr className='table-info'>
            <th onClick={handleSort('name')} className='text-primary storage-sort'>
              {i18n.t('storage.name_col')}
            </th>
            <th onClick={handleSort('price')} className='text-primary storage-sort'>
              {i18n.t('storage.price_col')}
            </th>
            <th onClick={handleSort('quantity')} className='text-primary storage-sort'>
              {i18n.t('storage.quantity_storage_col')}
            </th>
            <th onClick={handleSort('ordered')} className='text-primary storage-sort'>
              {i18n.t('storage.quantity_ordered_col')}
            </th>


          </tr>
        </thead>
        <tbody>
          {slice(sortedKeys, startIndex, endIndex).map((id) => {
            return (
              <tr key={id} id={id} onClick={handleShowModal}>
                <td>{goodsList[id]['name']}</td>
                <td>{getPriceStr(goodsList[id]['price_eur'], goodsList[id]['price_cent'], 'eur')}</td>
                <td>{goodsList[id]['quantity']}</td>
                <td>0</td>

              </tr>
            )}
          )}
        </tbody>
      </Table>
      </Row>
      {role === 'superadmin' ?
      <ModalEditItem
      show={editModal}
      onHide={handleCloseEdit}
      id={viewedItem}
      item={goodsList[viewedItem]}
      /> :
      <ModalAccessDenied show={editModal} onHide={handleCloseEdit}/>}
      <ModalAddItem
      show={addModal}
      onHide={handleCloseAdd}
      />

      <Row className='justify-content-between'>
        <Col className='order-2 order-md-1 col-6 col-md-4'>
          <Row className='align-items-center justify-content-start'>
            <Col className='text-nowrap pe-0 col-auto'>
              {i18n.t('storage.pag_count')}
            </Col>
            <Col className='col-auto'>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary">
              {itemsOnPage}
            </Dropdown.Toggle>
            <Dropdown.Menu onClick={switchItemsOnPage} id='storage_dropdown'>
              <Dropdown.Item>5</Dropdown.Item>
              <Dropdown.Item>10</Dropdown.Item>
              <Dropdown.Item>20</Dropdown.Item>
              <Dropdown.Item>50</Dropdown.Item>
              <Dropdown.Item>100</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Col>
          </Row>
        </Col>

        <Col className='d-flex justify-content-center order-1 order-md-2 col-12 col-md-4'>
          <PaginationStorage current={currentPage} setCurrent={setCurrent} pagesNum={pagesNum} />
        </Col>

        <Col className='order-3 order-md-3 col-6 col-md-4'>
          <Row className='justify-content-end align-items-center'>
            <Col className='col-auto'>
              {i18n.t('storage.pag_to')}
            </Col>
            <Col className='col-4 col-md-2'>
              <InputGroup>
                <Form.Control
                  id='goInput'
                  onChange={changeGoInput}
                  aria-label='on_page'
                  aria-describedby="on_page"
                />
              </InputGroup>
            </Col>
            <Col className='col-auto ps-0'>
              <Button id='goBtn' onClick={switchPageGo} variant='outline-primary' className='disabled'>
                GO
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Storage;
