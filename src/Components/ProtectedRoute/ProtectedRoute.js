import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('authToken');

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children; // Allow access to the protected route if token exists
};

export default ProtectedRoute;
