import React from 'react';
import {
  Dropdown,
} from 'react-bootstrap';
import i18n from '../../i18n';

const DropdownOrderStatus = ({ handleSwitchStatus }) => {
  return (
    <Dropdown className='noActiveDropdown'>
      <Dropdown.Toggle variant="primary" className='text-secondary'>
        {i18n.t('order_card.dropdown_title')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleSwitchStatus}>
          {i18n.t('order_card.processed')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSwitchStatus}>
          {i18n.t('order_card.paid')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSwitchStatus}>
          {i18n.t('order_card.sent')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSwitchStatus}>
          {i18n.t('order_card.cancelled')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSwitchStatus}>
          {i18n.t('order_card.archived')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
};

export default DropdownOrderStatus;
