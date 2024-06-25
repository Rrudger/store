import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './components/Page404.jsx';
import Header from './components/Header.jsx';
import MainPage from './components/MainPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import ClientArea from './components/user_area/ClientArea.jsx';
import Cart from './components/user_area/Cart.jsx';
import Storage from './components/admin_area/Storage.jsx';
import Users from './components/admin_area/Users.jsx';
import Orders from './components/admin_area/Orders.jsx';
import AdminPage from './components/admin_area/AdminPage.jsx';
import UserInfo from './components/admin_area/UserInfo.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from './i18n';
import { actions as mainActions} from './slices/mainSlice.js';
import { actions as userActions} from './slices/userSlice.js';
import { actions as cartActions} from './slices/cartSlice.js';
import { getStorage } from './utils/dbUtils.js';

const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.mainState.lang);
  i18n.changeLanguage(lang);

const cart = localStorage.getItem('cart');
  if (cart) {
    dispatch(cartActions.setCart(JSON.parse(cart)));
  }

  getStorage()
  .then((response) => {
    dispatch(mainActions.setGoodsList(response.data));
  })
  .catch((err) => {
    toast.error(err.message);
  });



  const token = localStorage.getItem('token');
  if (token) {
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    dispatch(userActions.setLogged({ role, name, id }));
  };

  return (

    <div className="d-flex flex-column wh-100">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<MainPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/clientArea' element={<ClientArea />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path='/storage' element={<Storage />} />
          <Route path="/users" element={<Users />} />
          <Route path='/userInfo' element={<UserInfo />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
