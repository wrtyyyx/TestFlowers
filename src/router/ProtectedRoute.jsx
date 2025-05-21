import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }
        setIsAuthChecked(true);
    }, []);

    if (!isAuthChecked) {
        return <div>Завантаження...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signUp" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
