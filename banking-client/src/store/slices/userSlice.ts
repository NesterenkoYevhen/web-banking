import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunks/userThunks/registerUser';
import { loginUser } from '../thunks/userThunks/loginUser';
import { fetchUser } from '../thunks/userThunks/fetchUser';
import { logoutUser } from '../thunks/userThunks/logoutUser';

import { IUser } from '../../types/user';

const defaultUserState: IUser = {
  id: '',
  name: '',
  surname: '',
  email: '',
  gender: '',
  age: 0,
  role: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state: IUser, action) => {
      state.isAuth = true;
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.surname = action.payload.user.surname;
      state.email = action.payload.user.email;
      state.gender = action.payload.user.gender;
      state.age = action.payload.user.age;
      state.role = action.payload.user.role;
    });

    builder.addCase(loginUser.fulfilled, (state: IUser, action) => {
      state.isAuth = true;
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.surname = action.payload.user.surname;
      state.email = action.payload.user.email;
      state.gender = action.payload.user.gender;
      state.age = action.payload.user.age;
      state.role = action.payload.user.role;
    });

    builder.addCase(fetchUser.fulfilled, (state: IUser, action) => {
      if(!action.payload.user) {
        return state
      }
      state.isAuth = true;
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.surname = action.payload.user.surname;
      state.email = action.payload.user.email;
      state.gender = action.payload.user.gender;
      state.age = action.payload.user.age;
      state.role = action.payload.user.role;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuth = false;
      state.id = '';
      state.name = '';
      state.surname = '';
      state.email = '';
      state.gender = '';
      state.age = 0;
      state.role = '';
    });
  },
});

export const userReducer = userSlice.reducer;
