import React, { useState, createContext, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(JSON.parse(window.localStorage.getItem("credentials")) || {});

  const value = useMemo(
    () => ({
      credentials,
      setCredentials
    }),
    [credentials]
  );

  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
