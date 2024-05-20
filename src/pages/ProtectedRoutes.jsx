import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Authcontext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated? (
    <Route>{children}</Route>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;