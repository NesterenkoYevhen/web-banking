import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ITransfer } from '../../types/transfer';
import { BASE_URL } from '../../constants';

interface ITransferResponse {
  success: boolean;
}

const transfersApi = createApi({
  reducerPath: 'transfers',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      createTransfer: builder.mutation<ITransferResponse, ITransfer>({
        query: (transfer) => {
          return {
            url: '/transfers',
            method: 'POST',
            body: transfer,
            headers: {
              'Content-Type': 'application/json'
            }
          };
        }
      })
    }
  }
});

export const { useCreateTransferMutation } = transfersApi;
export { transfersApi };