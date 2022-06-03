import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingItemsFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    };

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingItemsFromStorage,
};

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ id, qty }, thunkAPI) => {
    const { data } = await axios.get(`/api/products/${id}`);

    // so you won't store all the information in the local storage, just pick the data you need
    const itemData = {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
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
  reducers: {
    removeItem: (state, { payload }) => {
      state.cartItems = payload;

      // renew the localStore
      localStorage.setItem("cartItems", JSON.stringify(payload));
    },
    saveShippingAddress: (state, { payload }) => {
      console.log(payload);
      state.shippingAddress = payload;
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, { payload }) => {
      state.cartItems = payload;

      // // save to local storage
      localStorage.setItem("cartItems", JSON.stringify(payload));
    },
  },
});

export const { removeItem, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;
