import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { REGISTRATION_URL } from '../../../constants';
import { IUser } from '../../../types/user';

interface IUserInfo {
  name: string;
  surname: string;
  email: string;
  gender: string;
  age: number;
  password: string;
}

const registerUser = createAsyncThunk(
  'user/signup',
  async (userInfo: IUserInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        REGISTRATION_URL,
        JSON.stringify(userInfo),
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        }
      );
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

export { registerUser };
