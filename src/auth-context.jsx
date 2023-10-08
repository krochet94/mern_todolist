import React, { useState, createContext, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({ username: 'krochet94', password: '121794' }); //to be removed

  const value = useMemo(
    () => ({
      credentials,
      setCredentials
    }),
    [credentials]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
