export default {
  translation: {
    page404: 'Page not found / But you can go to the / main page',
    login_form: {
      title_and_submit: 'Log in',
      username: 'Username',
      password: 'Password',
      no_acc_text: 'Need an account? ',
      no_acc_link: 'Sing up',
    },
    signup_form: {
      submit_title: 'Sing up',
      username: 'Choose your username',
      password: 'Choose a password',
      success_registration: 'Your registration has been successful!',
    },
    client_area: {
      changeNameBtn: 'change username',
      changePasswordBtn: 'change password',
      deleteAccBtn: 'delete account',
      deleteSuccessMessage: 'Your account has been successfully deleted',
    },
    cart: {
      empty: 'Your cart is empty',
      subtotal: 'Subtotal:',
      total: 'Total:',
      delivery: 'Shipping fees:',
      success_toast: 'The order has been paid and accepted!',
      warninig_toast: 'To place an order please login or sing up!'
    },
    buttons: {
      storage: 'storage',
      orders: 'orders',
      users: 'users',
      login: 'login',
      close: 'close',
      delete: 'delete',
      save: 'save',
      add: 'add',
      cancel: 'cancel',
      remove_all: 'remove all',
      checkout: 'Proceed to checkout',
      archive: 'Archived orders',
      active: 'Active orders',
    },
    add_modal: {
      storage: {
        title: 'Add item',
        name: 'Name',
        quantity: 'Quantity',
        price_eur: 'Euro',
        price_cent: 'Cents',
        success_toast: 'The item was added successfully',
      }
    },
    delete_modal: {
      storage: {
        title: 'Delete item',
        text: 'Are you sure you want to delete this item?',
      },
      client: {
        title: 'Delete account',
        text: 'Are you sure you want to delete your account?',
      }
    },
    alter_modal: {
      client: {
        title_name: 'Change user name',
        title_password: 'Change user password',
        text: 'test',
        name_label: 'New name',
        old_password_label: 'Old password',
        password_label: 'New password',
        confirm_password_label: 'Repeat new password',
      }
    },
    errors: {
      empty_field: 'Cannot be empty',
      number_type: 'Must be a number',
      number_integer: 'Must be an integer',
      number_positive: 'Сannot be less than zero',
      max99: 'Сents cannot be more than 99',
      name_required: 'Username is required field',
      password_required: 'Password is required field',
      min_6: 'Must contain minimum 6 characters',
      password_match: 'Passwords must match',
    },
    tooltips: {
      storage: 'Click to sort by',
      add_item: 'Click to add an item',
      exit_btn: 'Click to log out',
      tippy_status: 'The order has been',
      tippy_date: 'Created at',
      tippy_user_name: 'Username: ',
    },
    admin: {
      users_title: 'Users',
      modal_acc_title: 'Delete account',
      modal_acc_body: 'Are you sure you want to delete account?',
      modal_acc_cancel_btn: 'cancel',
      modal_acc_delete_btn: 'delete',
      deleteAccBtn: 'delete account',
      deleteSuccessMessage: 'The account has been successfully deleted',
    },
    storage: {
      name_col: 'Name',
      price_col: 'Price',
      quantity_storage_col: 'Stored',
      quantity_ordered_col: 'Ordered',
      edit_col: 'Edit',
      modal_denied_text: 'Editing is available only to user whith super admin privileges',
      modal_title: 'Edit item',
      pag_count: 'Items on page',
      pag_to: 'Page',
    },
    main_page: {
      add_in_cart: 'add in cart',
    },
    header: {
      title: 'Aaa STORE',
      badge: 'items in cart'
    },
    user_orders: {
      no_orders: 'You have no orders yet...',
      delivery: 'delivery:',

      paid: 'paid',
      sent: 'sent',
      cancelled: 'cancelled',
      processed: 'processed',
      archived: 'archived',
    },
    admin_orders: {
      dropdown_title: 'Sort by: ',
      sort_by_date: 'date',
      sort_by_user: 'user',
      sort_by_status: 'status',
    },
    order_card: {
      dropdown_title: 'Switch status',
      processed: 'Processed',
      paid: 'Paid',
      sent: 'Sent',
      cancelled: 'Cancelled',
      archived: 'Archived',
    },
  },
};
