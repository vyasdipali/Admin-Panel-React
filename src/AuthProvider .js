  import React, { createContext, useContext, useEffect, useState } from 'react';
  import axios from 'axios';

  const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
    const retrievedToken = sessionStorage.getItem('token');

    useEffect(() => {
      if (retrievedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${retrievedToken}`;
      } else {
        console.warn('No authentication token found.');
      }
    }, [retrievedToken]);

    return (
      <AuthContext.Provider value={{ retrievedToken, API_ENDPOINT }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);
