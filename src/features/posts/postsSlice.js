import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
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
export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (_id) => {
    try {
      return await postsService.getPostById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);
export const getPostByTitle = createAsyncThunk(
  "posts/getPostByTitle",
  async (title) => {
    try {
      return await postsService.getPostByTitle(title);
    } catch (error) {
      console.error(error);
    }
  }
);

export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const modifyComment = createAsyncThunk("post")

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(like.fulfilled, (state, action) => {
        console.log(state.posts);
        const posts = state.posts.map((post) => {
          console.log(post);
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      });
  },
});

export default postsSlice.reducer;
