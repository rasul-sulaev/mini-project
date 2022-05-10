import authReducer from "./slices/auth";
import postsReducer from "./slices/posts";
import userReducer from "./slices/users";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    posts: postsReducer,
  }
})