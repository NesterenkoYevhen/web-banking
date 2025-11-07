import { createSlice } from '@reduxjs/toolkit';
import { ICurrency } from '../../types/currency';
import { fetchCurrenciesRates } from '../thunks/currenciesThunks/fetchCurrencies';

const defaultUserState: ICurrency[] = [
  { type: 'EUR', rate: 38.6},
  { type: 'USD', rate: 36.56},
  { type: 'GBP', rate: 43.75}
];

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: defaultUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrenciesRates.fulfilled, (state: ICurrency[], action) => {
      return [...action.payload]
    });
  },
});

export const currenciesReducer = currenciesSlice.reducer;