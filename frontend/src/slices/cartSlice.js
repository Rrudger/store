import { createSlice, current } from '@reduxjs/toolkit';
import { findIndex, merge, without } from 'lodash';
import { getSum, getProduct } from '../utils/utils.js';

const initialState = {
  cart: [],
  itemsNum: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const index = findIndex(state.cart, { id: payload.id });
      if (index === -1) {
        localStorage.setItem('cart', JSON.stringify([...state.cart, payload]));
        return merge(state, {
          cart: [...state.cart, payload],
          itemsNum: state.itemsNum + payload.quantity
        });
      } else {
        const newItem = {
          id: payload.id,
          quantity: state.cart[index].quantity + payload.quantity
        };
        const newCart = [...state.cart.slice(0, index), newItem, ...state.cart.slice(index + 1)];
        localStorage.setItem('cart', JSON.stringify([...newCart]));
        return merge(state, {
          cart: [...newCart],
          itemsNum: state.itemsNum + payload.quantity
        })
      }
    },
    removeItem(state, { payload }) {
      const index = findIndex(state.cart, { id: payload.id });
      const item = state.cart[index];
      if (item.quantity - payload.quantity <= 0) {
        const filtredCart = without(state.cart, state.cart[index]);
        localStorage.setItem('cart', JSON.stringify([...filtredCart]));
        return merge(state, {
          cart: [...filtredCart],
          itemsNum: state.itemsNum - item.quantity,
        });
      } else {
        const newItem = {
          id: payload.id,
          quantity: item.quantity - payload.quantity,
        };
        const newCart = [...state.cart.slice(0, index), newItem, ...state.cart.slice(index + 1)];
        localStorage.setItem('cart', JSON.stringify([...newCart]));
        return merge(state, {
          cart: [...newCart],
          itemsNum: state.itemsNum - payload.quantity,
        });
      }
    },
    deleteItem(state, { payload }) {
      const index = findIndex(state.cart, { id: payload });
      const filtredCart = without(state.cart, state.cart[index]);
      localStorage.setItem('cart', JSON.stringify([...filtredCart]));
      return {
        cart: [...filtredCart],
        itemsNum: state.itemsNum - state.cart[index].quantity,
      };
    },
    setCart(state, { payload }) {
      const num = payload.reduce((sum, curItem) => sum + curItem.quantity, 0);

      return merge(state, {
        cart: payload,
        itemsNum: num,
      });
    },
    cleanCart(state) {
      localStorage.setItem('cart', JSON.stringify([]));
      return merge(state, { cart: [], itemsNum: 0 })
    }
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;
