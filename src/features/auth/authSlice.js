import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || "";

const initialState = {
  user: user,
  token: token,
  isLoading: true,
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
        
        })
        
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
          state.token = "";
          state.isLoading = true
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.isLoading = false;
      })
      .addCase(getLoggedUser.pending, (state) => {
        state.isLoading = true
      })
  },
});

export const getLoggedUser = createAsyncThunk("auth/getLoggedUser", async () => {
    try {
      return await authService.getLoggedUser();
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
