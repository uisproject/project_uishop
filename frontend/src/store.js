import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/product";
import productDetailReducers from "./features/productDetail";
import cartReducers from "./features/cart";
import loginReducers from "./features/user";
import registerReducer from "./features/register";

const store = configureStore({
  reducer: {
    productList: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
    user: loginReducers,
    register: registerReducer,
  },
});

export default store;
