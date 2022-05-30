import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/product";

const store = configureStore({
  reducer: {
    productList: productReducers,
  },
});

export default store;
