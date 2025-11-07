import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../thunks/weatherThunks/fetchWeather';

import { IWeather } from '../../types/weather';
import { WEATHER_TYPES } from '../../constants';

const defaultWeatherState: IWeather = {
  weatherProps: WEATHER_TYPES[0],
  temperature: 14,
  place: 'Kyiv, UA'
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: defaultWeatherState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state: IWeather, action) => {
      state.weatherProps = action.payload.weatherProps;
      state.temperature = action.payload.temperature;
      state.place = action.payload.place;
    });
  },
});

export const weatherReducer = weatherSlice.reducer;