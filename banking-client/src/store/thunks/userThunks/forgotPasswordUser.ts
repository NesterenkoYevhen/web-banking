import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FORGOT_PASSWORD_URL } from '../../../constants';
interface IUserLoginInfo {
  email: string;
}

const forgotPasswordUser = createAsyncThunk(
  'user/password',
  async (userInfo: IUserLoginInfo, { rejectWithValue }) => {
    try {
      const response = await axios.patch(FORGOT_PASSWORD_URL, JSON.stringify(userInfo), {
        headers: { 'Content-Type': 'application/json', withCredentials: true },
      });
      const success: boolean = response.data.success;
      return success;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export { forgotPasswordUser };
