import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LOGIN_URL } from '../../../constants';
import { IUser } from '../../../types/user';

interface IUserLoginInfo {
  email: string;
  password: string;
}

const loginUser = createAsyncThunk(
  'user/signin',
  async (userInfo: IUserLoginInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(userInfo), {
        headers: { 'Content-Type': 'application/json', withCredentials: true },
      });
      const user: IUser = response.data;
      return { user };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export { loginUser };
