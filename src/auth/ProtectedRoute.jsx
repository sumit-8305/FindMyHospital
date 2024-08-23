import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // This should be your authentication hook

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;
