import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/product";
import productDetailReducers from "./features/productDetail";

const store = configureStore({
  reducer: {
    productList: productReducers,
    productDetail: productDetailReducers,
  },
});

export default store;
