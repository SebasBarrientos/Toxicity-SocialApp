import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = JSON.parse(localStorage.getItem("token")) || nul;

const initialState = {
  user: user,
  token: token,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isSuccess = true; // esto no va
      state.message = action.payload.msg; // esto no va
    });
    addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  return await authService.register(userData);
});

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error(error);
  }
});

export default authSlice.reducer;
