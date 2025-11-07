import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CURRENCIES_APIKEY, CURRENCIES_URL } from '../../../constants';

const fetchCurrenciesRates = createAsyncThunk(
  'currencies/rates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(CURRENCIES_URL, {
        headers: {
          apikey: CURRENCIES_APIKEY
        },
      });
      const currencies: any = response.data.rates;
      return [ 
        { type: 'EUR', rate: 1 / currencies['EUR']},
        { type: 'USD', rate: 1 / currencies['USD']},
        { type: 'GBP', rate: 1 / currencies['GBP']} 
      ];
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export { fetchCurrenciesRates };