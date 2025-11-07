import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IReplenishment } from '../../types/replenishment';
import { BASE_URL } from '../../constants';

interface IReplenishmentResponse {
  success: boolean;
}

const replenishmentsApi = createApi({
  reducerPath: 'replenishments',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      createReplenishment: builder.mutation<IReplenishmentResponse, IReplenishment>({
        query: (replenishment) => {
          return {
            url: '/replenishments',
            method: 'POST',
            body: replenishment,
            headers: {
              'Content-Type': 'application/json'
            }
          };
        }
      })
    }
  }
});

export const { useCreateReplenishmentMutation } = replenishmentsApi;
export { replenishmentsApi };