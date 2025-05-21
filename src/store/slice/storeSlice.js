import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const takeOrders = () => {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
};

const saveOrders = (orders) => {
    localStorage.setItem('orders', JSON.stringify(orders));
};

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        products: JSON.parse(localStorage.getItem('cart')) || [],
        orders: takeOrders(),
    },
    reducers: {
        setStore: (state, action) => {
            const oldItem = state.products.find((item) => item._id === action.payload._id);
            if (oldItem) {
                oldItem.quantity = action.payload.quantity;
                oldItem.price = action.payload.basePrice * oldItem.quantity;
                if (action.payload.quantity === 0) {
                    state.products.splice(action.p, 1);
                }
            } else {
                state.products.push({ ...action.payload, basePrice: action.payload.price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(state.products));
        },

        addOrder: (state, action) => {
            const newOrder = {
                id: uuidv4(),
                date: new Date().toLocaleString(),
                total: state.products.reduce((acc, item) => acc + item.price, 0),
                products: [...state.products],
                address: action.payload.address,
                payBy: action.payload.payBy,
                user: action.payload.user,
                email: action.payload.email,
            };
            state.orders.push(newOrder);
            state.products = [];
            localStorage.removeItem('cart');
            saveOrders(state.orders);
        },

        setOrders: (state, action) => {
            state.orders = action.payload;
            saveOrders(state.orders);
        },
        resetStore: (state, action) => {
            state.products = [];
            state.orders = state.orders.filter((order) => order.email !== action.payload.email);
            saveOrders(state.orders);
        },

        deleteItem: (state, action) => {
            state.products.splice(action, 1);

            localStorage.setItem('cart', JSON.stringify(state.products));
        },
    },
});

export const { setStore, resetStore, setOrders, addOrder, deleteItem } = storeSlice.actions;
export default storeSlice.reducer;
