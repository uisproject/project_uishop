import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/product";
import productDetailReducers from "./features/productDetail";
import cartReducers from "./features/cart";
import loginReducers from "./features/user";
import registerReducer from "./features/register";
import updateProfileReducer from "./features/updateProfile";
import userDetailReducer from "./features/userDetail";

const store = configureStore({
  reducer: {
    productList: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
    user: loginReducers,
    register: registerReducer,
    updateProfile: updateProfileReducer,
    userDetail: userDetailReducer,
  },
});

export default store;
