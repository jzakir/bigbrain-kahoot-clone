import React from 'react';
import { useContext, Context } from '../authContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute ({ children }) {
  const { authToken } = useContext(Context);
  console.log(authToken);
  if (!authToken) {
    return <Navigate
      to="/login"
      replace
    />
  }
  return children;
}
