import { div } from 'framer-motion/client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const UserRouter = ({ children }) => {
    const [isUser, setIsUser] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setIsUser(true);
        }
        setIsAuthChecked(true);
    }, []);

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    if (!isUser) {
        return <Navigate to="/signUp" replace />;
    }
    return children;
};

export default UserRouter;
