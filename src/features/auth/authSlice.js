import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || "";

const initialState = {
  user: user,
  token: token,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = "";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (id) => {
    try {
      return await authService.getUserById(id);
    } catch (error) {
      console.error(error);
    }
  }
);

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

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export default authSlice.reducer;
