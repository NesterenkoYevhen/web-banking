import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICreditCard } from '../../types/credit-card';
import { BASE_URL } from '../../constants';

interface ICreditCardAttrs {
  number: number,
  type: string,
  payment_system: string,
  color: string,
  online_limit?: number,
  offline_limit?: number
}

enum CardTags {
  CreditCards = 'CreditCards',
  CreditCard = 'CreditCard'
}

interface CreditCardTag {
  type: CardTags;
  id: string;
}

const cardsApi = createApi({
  reducerPath: 'cards',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['CreditCards', 'CreditCard'],
  endpoints(builder) {
    return {
      fetchCards: builder.query<ICreditCard[], void>({
        providesTags: (result, error) => {
          const tags: CreditCardTag[] = [];
          tags.push(
            ...(result?.map((card) => ({
              type: CardTags.CreditCard,
              id: card.number.toString(),
            })) ?? [])
          );
          tags.push({ type: CardTags.CreditCards, id: 'created_card' });
          return tags;
        },
        query: () => {
          return {
            url: '/cards',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        }
      }),
      createCard: builder.mutation<ICreditCard, ICreditCardAttrs>({
        invalidatesTags: (result, error, card) => {
          return [{ type: 'CreditCards', id: 'created_card' }];
        },
        query: (card) => {
          return {
            url: '/cards',
            method: 'POST',
            body: card,
            headers: {
              'Content-Type': 'application/json'
            }
          };
        }
      })
    }
  }
});

export const { useFetchCardsQuery, useCreateCardMutation } = cardsApi;
export { cardsApi };