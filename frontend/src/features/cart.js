import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ id, qty }, thunkAPI) => {
    const { data } = await axios.get(`/api/products/${id}`);

    // so you won't store all the information in the local storage, just pick the data you need
    const itemData = {
      productId: data._id,
      name: data.name,
      image: data.price,
      countInStock: data.countInStock,
      qty,
    };

    const { cartItems } = await thunkAPI.getState().cart;

    const existItem = await cartItems.find(
      (item) => item.productId === itemData.productId
    );

    if (existItem) {
      return [
        ...cartItems.map((item) =>
          item.productId === existItem.productId ? itemData : item
        ),
      ];
    }

    return [...cartItems, itemData];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [addToCart.fulfilled]: (state, { payload }) => {
      state.cartItems = payload;

      // // save to local storage
      localStorage.setItem("cartItems", JSON.stringify(payload));
    },
  },
});

export const { cartAddItem } = cartSlice.actions;

export default cartSlice.reducer;
