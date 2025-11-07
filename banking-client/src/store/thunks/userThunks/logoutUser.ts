import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LOGOUT_URL } from '../../../constants';

const logoutUser = createAsyncThunk(
  'user/signout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(LOGOUT_URL, {
        headers: { 'Content-Type': 'application/json', withCredentials: true },
      });

      return {};
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export { logoutUser };
