import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetOrdersByEmailQuery } = orderApi;
export default orderApi;
