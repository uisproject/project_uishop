import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/product";
import productDetailReducers from "./features/productDetail";
import cartReducers from "./features/cart";

const store = configureStore({
  reducer: {
    productList: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
  },
});

export default store;
