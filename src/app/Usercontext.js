"use client"
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  const setUser = (session) => {
    setUserSession(session);
  };

  return (
    <UserContext.Provider value={{ userSession, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
