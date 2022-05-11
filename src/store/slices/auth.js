import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false || JSON.parse(localStorage.getItem('isLoggedIn')),
    user: null || JSON.parse(localStorage.getItem('user')),
  },
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('isLoggedIn', 'true');
    },
    logOut: state => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  },
});


export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer;

export const selectIsLoggedIn = (state => state.auth.isLoggedIn);
export const selectUser = (state => state.auth.user);