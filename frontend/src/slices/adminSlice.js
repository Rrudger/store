import { createSlice, current } from '@reduxjs/toolkit';
import { isEmpty, merge } from 'lodash';

const initialState = {
  activeOrders: [],
  archivedOrders: [],
  userOrders: [],
  usersList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUserOrders(state, { payload }) {
      return { usersList: state.usersList, userOrders: payload }
    },
    setOrders(state, { payload }) {
      if (payload.page === 'orders') {
        return merge(state, { activeOrders: payload.data })
      } else {
        return merge(state, { archivedOrders: payload.data });
      }
    },
    setUsersList(state, { payload }) {
      return merge(state, { usersList: payload });
    },
  },
});

export const { actions } = adminSlice;
export default adminSlice.reducer;
