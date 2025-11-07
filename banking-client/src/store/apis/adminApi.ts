import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUser } from '../../types/user';
import { BASE_URL } from '../../constants';
import { IReplenishmentAdmin } from '../../types/replenishmentAdmin';

interface IReplenishmentResponse {
  success: boolean;
}

interface IAdminAnswer {
  id: string;
  approved: boolean;
}

enum AdminTags {
  AdminReplenishments = 'AdminReplenishments'
}

interface AdminReplenishmentTag {
  type: AdminTags.AdminReplenishments;
  id: string;
}

const adminApi = createApi({
  reducerPath: 'admin',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [AdminTags.AdminReplenishments],
  endpoints(builder) {
    return {
      fetchUsers: builder.query<IUser[], void>({
        query: () => {
          return {
            url: '/admin/users',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
        },
      }),
      fetchReplenishments: builder.query<IReplenishmentAdmin[], void>({
        providesTags: (result, error) => {
          const tags: AdminReplenishmentTag[] = [];
          tags.push({ type: AdminTags.AdminReplenishments, id: 'updated_replenishment' });
          return tags;
        },
        query: () => {
          return {
            url: '/admin/replenishments',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
        },
      }),
      updateReplenishment: builder.mutation<
        IReplenishmentResponse,
        IAdminAnswer
      >({
        invalidatesTags: (result, error, card) => {
          return [{ type: AdminTags.AdminReplenishments, id: 'updated_replenishment' }];
        },
        query: (replenishment) => {
          return {
            url: `/admin/replenishments/${replenishment.id}`,
            method: 'PATCH',
            body: {
              approved: replenishment.approved,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery, useFetchReplenishmentsQuery, useUpdateReplenishmentMutation } = adminApi;
export { adminApi };
