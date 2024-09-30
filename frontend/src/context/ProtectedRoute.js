import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
    const { state } = useContext(AuthContext);

    return state.isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
