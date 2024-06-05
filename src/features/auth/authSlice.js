import { createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isSuccess = true;// esto no va
      state.message = action.payload.msg;// esto no va
    })}
});

export const register =  createAsyncThunk('auth/register' ,async (userData) =>{
  return await authService.register(userData);
})

export default authSlice.reducer;