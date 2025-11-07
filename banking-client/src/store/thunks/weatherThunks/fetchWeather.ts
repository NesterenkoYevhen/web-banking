import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { WEATHER_APIKEY, WEATHER_TYPES, WEATHER_URL } from '../../../constants';

const fetchWeather = createAsyncThunk(
  'weather/now',
  async (_, { rejectWithValue }) => {
    try {
      console.log('dsada')
      const [lat, lon] = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve([position.coords.latitude, position.coords.longitude]);
        }, reject);
      }) as number[];
      if (!lat || !lon) {
        throw new Error();
      }  
      const response = await axios.get(`${WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_APIKEY}`);
      const weatherFullInfo: any = response.data;
      const weatherProps = WEATHER_TYPES.filter((weather) => weather.type === weatherFullInfo.weather[0].main)[0]
      return { 
        weatherProps,
        temperature: weatherFullInfo.main.temp,
        place: `${weatherFullInfo.name}, ${weatherFullInfo.sys.country}`
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export { fetchWeather };