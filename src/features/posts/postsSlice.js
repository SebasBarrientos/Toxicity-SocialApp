import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {}
};

export const addPost = createAsyncThunk("posts/addPost", async (dataForm) => {
  return await postsService.addPost(dataForm);
});
export const getPosts = createAsyncThunk("posts/getPosts", async (page) => {
  try {
    return await postsService.getPosts(page);
  } catch (error) {
    console.error(error);
  }
});
export const getPostById = createAsyncThunk("posts/getPostById", async (_id) => {
  try {
    return await postsService.getPostById(_id)
  } catch (error) {
    console.error(error);
  }
})
export const getPostByTitle = createAsyncThunk("posts/getPostByTitle", async (title) => {
  try {
    return await postsService.getPostByTitle(title)
  } catch (error) {
    console.error(error);
  }
})

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload
        state.isLoading = false

      })
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false
      })
  }
});

export default postsSlice.reducer;