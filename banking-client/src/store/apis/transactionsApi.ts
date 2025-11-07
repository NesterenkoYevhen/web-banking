import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ITransaction } from '../../types/transaction';
import { BASE_URL } from '../../constants';


const transactionsApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchTransactions: builder.query<ITransaction[], void>({
        query: () => {
          return {
            url: '/transactions',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        }
      })
    }
  }
});

export const { useFetchTransactionsQuery } = transactionsApi;
export { transactionsApi };