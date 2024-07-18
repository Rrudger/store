import { createSlice, current } from '@reduxjs/toolkit';
import { merge, trim } from 'lodash';

const initialState = {
  logged: false,
  role: 'user',
  name: '',
  id: '',
  orders: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogged(state, { payload }) {
      return merge(state, { logged: true, role: payload.role, name: payload.name, id: payload.id });
    },
    logOut(state) {
      return merge(state, { logged: false, role: 'user', name: '', id: '' });
    },
    alterName(state, { payload }) {
      return merge(state, { name: payload });
    },
    setOrders(state, { payload }) {
      return merge(state, { orders: payload });
    }
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
