export default {
  translation: {
    page404: 'Страница не найдена / Но вы можете перейти на / главную страницу',
    login_form: {
      title_and_submit: 'Войти',
      username: 'Имя',
      password: 'Пароль',
      no_acc_text: 'Нет аккаунта? ',
      no_acc_link: 'Регистрация',
    },
    signup_form: {
      submit_title: 'Зарегистрироваться',
      username: 'Выберите имя пользователя',
      password: 'Выберите пароль',
      success_registration: 'Регистрация прошла успешно!',
    },
    client_area: {
      changeNameBtn: 'изменить имя пользователя',
      changePasswordBtn: 'изменить пароль',
      deleteAccBtn: 'удалить аккаунт',
      deleteSuccessMessage: 'Ваш аккаунт был успешно удален',
    },
    cart: {
      empty: 'Ваша корзина пуста',
      subtotal: 'Сумма заказа:',
      total: 'Общая сумма:',
      delivery: 'Стоимость доставки:',
      success_toast: 'Заказ успешно оплачен и принят в обработку!',
      warninig_toast: 'Чтобы оформить заказ войдите в аккаунт или зарегистрируйтесь!'
    },
    buttons: {
      storage: 'склад',
      orders: 'заказы',
      users: 'покупатели',
      login: 'войти',
      close: 'закрыть',
      delete: 'удалить',
      save: 'сохранить',
      add: 'добавить',
      remove_all: 'удалить все',
      checkout: 'Оформить покупку',
    },
    add_modal: {
      storage: {
        title: 'Добавить товар',
        name: 'Наименование',
        quantity: 'Количество',
        price_eur: 'Евро',
        price_cent: 'Центы',
        success_toast: 'Товар был успешно добавлен',
      }
    },
    delete_modal: {
      storage: {
        title: 'Удалить товар',
        text: 'Вы уверены, что хотите удалить этот товар?',
      },
      client: {
        title: 'Удалить аккаунт',
        text: 'Вы уверены, что хотите удалить свой аккаунт?',
      }
    },
    alter_modal: {
      client: {
        title_name: 'Изменить имя пользователя',
        title_password: 'Изменить пароль',
        text: 'test',
        name_label: 'Новое имя пользователя',
        old_password_label: 'Текущий пароль',
        password_label: 'Новый пароль',
        confirm_password_label: 'Повторите новый пароль',
      }
    },
    errors: {
      empty_field: 'Не может быть пустым',
      number_type: 'Должно быть числом',
      number_integer: 'Должно быть целым числом',
      number_positive: 'Не может быть меньше нуля',
      max99: 'Не может быть больше 99',
      name_required: 'Не может быть пустым',
      password_required: 'Не может быть пустым',
      min_6: 'Должен содержать минимум 6 символов',
      password_match: 'Пароли должны совпадать',
    },
    tooltips: {
      storage: 'Нажмите чтобы сортировать по',
      add_item: 'Нажмите чтобы добавить товар',
      exit_btn: 'Нажмите чтобы выйти из аккаунта',
    },
    admin: {
      users_title: 'Пользователи',
      modal_acc_title: 'Удалить аккаунт',
      modal_acc_body: 'Вы уверены, что хотите удалить аккаунт?',
      modal_acc_cancel_btn: 'отмена',
      modal_acc_delete_btn: 'удалить',
      deleteAccBtn: 'удалить аккаунт',
      deleteSuccessMessage: 'Аккаунт был успешно удален',
    },
    storage: {
      name_col: 'Название',
      price_col: 'Цена',
      quantity_storage_col: 'На складе',
      quantity_ordered_col: 'Заказано',
      edit_col: 'Редактировать',
      modal_denied_text: 'Редактирование доступно только пользователям с правами супер администратора',
      modal_title: 'Редактировать товар',
      pag_count: 'Товаров на странице',
      pag_to: 'Страница',
    },
    main_page: {
      add_in_cart: 'в корзину',
    },
    header: {
      title: 'Aaa STORE',
      badge: 'товаров в корзине'
    }
  },
};
