import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/orders',
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                method: 'POST',
                body: order,
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),

        getUserOrders: builder.query({
            query: (userId) => `user/${userId}`,
            providesTags: (result = []) =>
                result.length
                    ? [...result.map(({ _id }) => ({ type: 'Order', id: _id })), { type: 'Order', id: 'LIST' }]
                    : [{ type: 'Order', id: 'LIST' }],
        }),
        deleteUserOrders: builder.mutation({
            query: (userId) => ({
                url: `user/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),

        getOrder: builder.query({
            query: (orderId) => `/${orderId}`,
            providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `/${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Order', id },
                { type: 'Order', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useDeleteOrderMutation,
    useDeleteUserOrdersMutation,
    useGetOrderQuery,
    useGetUserOrdersQuery,
} = ordersApi;
