import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {USERS_URL} from "../../utils/constants";


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (param) => {
    try {
      let response;
      if (param) {
        response = await fetch(USERS_URL + `?${Object.keys(param)}=${Object.values(param)}`);
      } else {
        response = await fetch(USERS_URL);
      }

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при поступлении пользователей');
      }
    } catch (err) {
      throw new Error('Ошибка при поступлении пользователей (API хост некорректен)');
    }
  }
)


export const editUser = createAsyncThunk(
  'users/editUser',
  async (user) => {
    try {
      const response = await fetch(USERS_URL + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при редактировании данных аккаунта');
      }
    } catch (err) {
      throw new Error('Ошибка при редактировании данных аккаунта (API хост некорректен)');
    }
  }
)


export const createUser = createAsyncThunk(
  'users/fetchCreateUser',
  async (user) => {
    try {
      const response = await fetch(USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        return await response.json();
      }
      else {
        throw new Error('Ошибка при регистрации аккаунта');
      }
    } catch (err) {
      throw new Error('Ошибка при регистрации аккаунта (API хост некорректен)');
    }
  }
)



export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    try {
      const response = await fetch(USERS_URL + userId, {
        method: 'DELETE'
      });

      if (response.ok) {
        return userId
      }
      else {
        throw new Error('Ошибка при удалении аккаунта');
      }
    } catch (err) {
      throw new Error('Ошибка при удалении аккаунта (API хост некорректен)');
    }
  }
)


const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    error: null,
    secondLoading: '',
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error;
      })

      .addCase(editUser.pending, (state, action) => {
        state.secondLoading = 'pending-editUser';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.data = state.data.filter(user => user.id === action.payload.id)
        state.secondLoading = 'fulfilled-editUser';
      })

      .addCase(createUser.pending, (state, action) => {
        state.secondLoading = 'pending-createUser';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.secondLoading = 'fulfilled-createUser';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error;
        console.log('Ошибка при регистрации аккаунта')
      })


      .addCase(deleteUser.pending, (state, action) => {
        state.secondLoading = 'pending-deleteUser';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(user => user.id !== action.payload)
        state.secondLoading = 'fulfilled-deleteUser';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error;
        console.log('Ошибка при удалении аккаунта')
      })
  }
})


export default userSlice.reducer;

export const selectUsers = (state => state.users);