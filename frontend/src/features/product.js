import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  products: [],
};

export const getProductList = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/products/");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductList.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    },
    [getProductList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default productSlice.reducer;
