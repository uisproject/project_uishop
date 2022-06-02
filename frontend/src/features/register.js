import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginRequest } from "./user";

const initialState = {
  isLoading: false,
  registerIsSuccess: false,
};

export const register = createAsyncThunk(
  "register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );

      if (data) {
        thunkAPI.dispatch(loginRequest({ email, password }));
        return true;
      }

      return false;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

const userRegister = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.registerIsSuccess = payload;
      state.isLoading = false;
    },
    [register.rejected]: (state, { payload }) => {
      state.registerIsSuccess = false;
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default userRegister.reducer;
