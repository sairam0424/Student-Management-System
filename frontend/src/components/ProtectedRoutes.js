// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../customHooks/UserContext';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { user } = useUser();

  if (!user) {

    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect to home or an error page
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;