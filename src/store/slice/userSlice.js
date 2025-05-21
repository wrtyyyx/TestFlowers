import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },

        resetUser: () => {
            sessionStorage.removeItem('user');
            localStorage.removeItem('token');
            return initialState;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
