import { createSlice, current } from '@reduxjs/toolkit';
import { merge } from 'lodash';

const initialState = {
  current_user: {},
  usersList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      return merge(state, { current_user: payload });
    },
    setUsersList(state, { payload }) {
      return merge(state, { usersList: payload });
    },

  },
});

export const { actions } = adminSlice;
export default adminSlice.reducer;
