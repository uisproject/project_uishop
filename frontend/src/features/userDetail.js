import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  userDetail: [],
};

export const getUserDetail = createAsyncThunk(
  "userDetail",
  async (_, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/user/profile", config);
    return data;
  }
);

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  extraReducers: {
    [getUserDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserDetail.fulfilled]: (state, { payload }) => {
      state.userDetail = payload;
      state.isLoading = false;
    },
    [getUserDetail.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userDetailSlice.reducer;
