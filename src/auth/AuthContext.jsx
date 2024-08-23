import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Export the custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provide the authentication context to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Handle login logic
    setUser(userData);
  };

  const logout = () => {
    // Handle logout logic
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
