import { configureStore } from '@reduxjs/toolkit';

import { IUser } from '../types/user';
import { IWeather } from '../types/weather';
import { ICurrency } from '../types/currency';

import { userReducer } from './slices/userSlice';
import { currenciesReducer } from './slices/currenciesSlice';
import { weatherReducer } from './slices/weatherSlice';
import { cardsApi } from './apis/cardsApi';
import { replenishmentsApi } from './apis/replenishmentsApi';
import { transfersApi } from './apis/transfersApi';
import { transactionsApi } from './apis/transactionsApi';
import { adminApi } from './apis/adminApi';

export interface IRootState {
  user: IUser;
  currencies: ICurrency[];
  weather: IWeather;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    currencies: currenciesReducer,
    weather: weatherReducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [replenishmentsApi.reducerPath]: replenishmentsApi.reducer,
    [transfersApi.reducerPath]: transfersApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(cardsApi.middleware)
      .concat(replenishmentsApi.middleware)
      .concat(transfersApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(adminApi.middleware)
  }
});

export * from './thunks/userThunks/registerUser';
export * from './thunks/userThunks/loginUser';
export * from './thunks/userThunks/fetchUser';
export * from './thunks/userThunks/logoutUser';
export * from './thunks/userThunks/forgotPasswordUser';

export * from './thunks/currenciesThunks/fetchCurrencies';

export * from './thunks/weatherThunks/fetchWeather';

export { useFetchCardsQuery, useCreateCardMutation } from './apis/cardsApi';

export { useCreateReplenishmentMutation } from './apis/replenishmentsApi';

export { useCreateTransferMutation } from './apis/transfersApi';

export { useFetchTransactionsQuery } from './apis/transactionsApi';

export { useFetchUsersQuery, useFetchReplenishmentsQuery, useUpdateReplenishmentMutation } from './apis/adminApi';

export { store };
