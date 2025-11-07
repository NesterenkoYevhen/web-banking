import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { USER_INFO_URL } from '../../../constants';
import { IUser } from '../../../types/user';

const fetchUser = createAsyncThunk(
  'user/currentuser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(USER_INFO_URL, {
        headers: { 'Content-Type': 'application/json', withCredentials: true },
      });
      const user: IUser = response.data.currentUser;
      return { user };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export { fetchUser };
