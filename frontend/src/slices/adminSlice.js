import { createSlice, current } from '@reduxjs/toolkit';
import { isEmpty, merge } from 'lodash';

const initialState = {
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
    setUsersList(state, { payload }) {
      return merge(state, { usersList: payload });
    },

  },
});

export const { actions } = adminSlice;
export default adminSlice.reducer;
