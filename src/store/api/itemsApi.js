import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page = 1, limit = 10, category } = {}) => {
                const params = new URLSearchParams();
                params.append('page', page);
                params.append('limit', limit);
                if (category && category !== 'All') params.append('category', category);
                return `products?${params.toString()}`;
            },
            providesTags: (result = []) =>
                result.length
                    ? [...result.map(({ _id }) => ({ type: 'Product', id: _id })), { type: 'Product', id: 'LIST' }]
                    : [{ type: 'Product', id: 'LIST' }],
        }),

        getProductsByCat: builder.query({
            query: (cat) => `/${cat}`,
            providesTags: (result = []) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Items', id })), { type: 'Items', id: 'LIST' }]
                    : [{ type: 'Items', id: 'LIST' }],
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getProductByTitle: builder.query({
            query: (title) => `products?search=${encodeURIComponent(title)}`,
            providesTags: (result = []) =>
                result.length ? result.map(({ _id }) => ({ type: 'Product', id: _id })) : [],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductsByCatQuery, useGetProductQuery, useGetProductByTitleQuery } =
    itemsApi;
