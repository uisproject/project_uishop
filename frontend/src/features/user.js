import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  isLoading: false,
  userInfo: userInfoFromStorage,
};

export const loginRequest = createAsyncThunk(
  "login",
  async ({ email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutRequest: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
  extraReducers: {
    [loginRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [loginRequest.fulfilled]: (state, { payload }) => {
      localStorage.setItem("userInfo", JSON.stringify(payload));
      state.userInfo = payload;
      state.isLoading = false;
    },
    [loginRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { logoutRequest } = userSlice.actions;

export default userSlice.reducer;
