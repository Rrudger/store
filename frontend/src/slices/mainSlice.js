import { createSlice, current } from '@reduxjs/toolkit';
import { merge } from 'lodash';

const initialState = {
  lang: 'en',
  langList: ['en', 'ru'],
  current_page: 'main',
  goodsList: {},
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLang(state, { payload }) {
      return merge(state, { lang: payload });
    },
    setGoodsList(state, { payload }) {
      const loadedGoodsList = Object.fromEntries(payload.map((item) => {
        return [item.id, {name: item.name, price_eur: item.price_eur, price_cent: item.price_cent, quantity: item.quantity }]
      }));
      return merge({ lang: state.lang, langList: state.langList, current_page: state.current_page }, { goodsList: loadedGoodsList });
    },
  },
});

export const { actions } = mainSlice;
export default mainSlice.reducer;
