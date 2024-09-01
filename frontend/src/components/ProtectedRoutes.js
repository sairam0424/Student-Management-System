import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../customHooks/UserContext";

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { user } = useUser();

  const isAllowed = useMemo(() => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }, [user, allowedRoles]);

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if user role is not allowed
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <><Component /></>;
};

export default ProtectedRoute;
