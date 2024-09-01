/**
 * The `ProtectedRoute` component in this JavaScript code checks if a user is logged in and has the
 * required role to access a specific route, redirecting them if necessary.
 * @returns The `ProtectedRoute` component returns the following:
 * 1. If the user is not logged in, it returns a `<Navigate>` component redirecting to "/login".
 * 2. If the user is logged in but their role is not allowed based on the `allowedRoles` prop, it
 * returns a `<Navigate>` component redirecting to "/".
 * 3. If the user is logged in and their role is
 */
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
