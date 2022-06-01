import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/product";
import productDetailReducers from "./features/productDetail";
import cartReducers from "./features/cart";
import loginReducers from "./features/user";

const store = configureStore({
  reducer: {
    productList: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
    user: loginReducers,
  },
});

export default store;
