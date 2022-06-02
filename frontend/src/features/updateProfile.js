import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  updatedUserData: [],
};

export const updateProfile = createAsyncThunk(
  "userDetail",
  async (body, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/user/profile", body, config);
    return data;
  }
);

const updateProfileSlice = createSlice({
  name: "userDetail",
  initialState,
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.updatedUserData = payload;
      state.isLoading = false;
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default updateProfileSlice.reducer;
