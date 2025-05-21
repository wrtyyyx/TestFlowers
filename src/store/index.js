import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from './api/itemsApi.js';
import storeReducer from './slice/storeSlice.js';
import userReducer from './slice/userSlice.js';
import { authApi } from './api/authApi.js';
import { ordersApi } from './api/ordersApi.js';

const userJson = sessionStorage.getItem('user');
const preloadedUser = userJson ? JSON.parse(userJson) : null;

const store = configureStore({
    reducer: {
        store: storeReducer,
        user: userReducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    preloadedState: {
        user: preloadedUser ? preloadedUser : {},
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemsApi.middleware).concat(authApi.middleware).concat(ordersApi.middleware),
});

export default store;
