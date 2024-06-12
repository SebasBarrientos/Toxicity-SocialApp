import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: true,
  isLoadingPost: true,
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

export const updatePost = createAsyncThunk("post/updatePost", async (_id) => {
  try {
    return await postsService.updatePost(_id);
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
export const getPostByName = createAsyncThunk(
  "posts/getPostByName",
  async (caption) => {
    console.log('HOL')
    try {
      return await postsService.getPostByName(caption);
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

export const dislike = createAsyncThunk("posts/dislike", async (_id) => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const modifyComment = createAsyncThunk("post");

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
        state.isLoadingPost = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoadingPost = false;
      })
      .addCase(getPostByName.fulfilled, (state, action) => {
        console.log('HIKAAASDASD');
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      })
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
        state.post= action.payload
      })
      .addCase(dislike.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
        state.post= action.payload
      });
  },
});

export default postsSlice.reducer;
