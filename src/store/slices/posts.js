import {createSlice} from "@reduxjs/toolkit";
import {POSTS_URL} from "../../utils/constants";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    try {
      const response = await fetch(POSTS_URL);

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при поступлении постов');
      }
    } catch (err) {
      throw new Error('Ошибка при поступлении постов (API хост некорректен)');
    }
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId) => {
    try {
      const response = await fetch(POSTS_URL + postId);

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при поступлении постов');
      }
    } catch (err) {
      throw new Error('Ошибка при поступлении постов (API хост некорректен)');
    }
  }
);


export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId) => {
    try {
      const response = await fetch(POSTS_URL + `?userId=${userId}`)

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при поступлении постов');
      }
    } catch (err) {
      throw new Error('Ошибка при поступлении постов (API хост некорректен)');
    }
  }
);


export const deletePost = createAsyncThunk(
  'posts/deletePosts',
  async (postId) => {
    try {
      const response = await fetch(POSTS_URL + postId, {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при удалении поста');
      }
    } catch (err) {
      throw new Error('Ошибка при удалении поста (API хост некорректен)');
    }
  }
)


export const editPost = createAsyncThunk(
  'posts/editPost',
  async (post) => {
    try {
      const response = await fetch(POSTS_URL + post.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })

      if (response.ok) {
        return post;
      } else {
        throw new Error('Ошибка при редактировании поста');
      }
    } catch (err) {
      console.log(err);
      throw new Error('Ошибка при редактировании поста (API хост некорректен)');
    }
  }
)


export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost) => {
    try {
      const response = await fetch(POSTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Ошибка при добавлении поста');
      }
    } catch (err) {
      console.log(err);
      throw new Error('Ошибка при добавлении поста (API хост некорректен)');
    }
  }
)


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    selectPost: {}, // выбранный пост (один пост)
    isLoading: false, // Загрузка при API запросов (Используется для основного Preloader'а)
    error: null, // Ошибка
    secondLoading: '', // Дополнительная загрузка
    userPosts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })


      .addCase(deletePost.pending, (state, action) => {
        state.secondLoading = 'pending-deletePost';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.data = state.data.filter(post => post.id !== action.payload.id);
        state.userPosts = state.userPosts.filter(post => post.id !== action.payload.id);
        state.secondLoading = 'fulfilled-deletePost';
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error;
      })


      .addCase(editPost.pending, (state, action) => {
        state.secondLoading = 'pending-editPost';
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.data = state.data.map(post => {
          if (post.id === action.payload.id) return action.payload
          return post
        })
        state.secondLoading = 'fulfilled-editPost';
      })
      // .addCase(editPost.rejected, (state, action) => {
      //   state.secondLoading = 'rejected';
      // })



      .addCase(fetchPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.selectPost = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })


      .addCase(createPost.pending, (state, action) => {
        state.secondLoading = 'pending-createPost';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.userPosts = [...state.userPosts, action.payload];
        state.selectPost = action.payload;
        state.secondLoading = 'fulfilled-createPost';
      })


      .addCase(fetchUserPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        // state.data = [];
        state.isLoading = false;
      })
  }
})


export const {setPosts} = postsSlice.actions;
export default postsSlice.reducer;

export const selectPosts = (state => state.posts);