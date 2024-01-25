import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Auth = ({ children, loggedIn }) => {
  let location = useLocation();
  if (loggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }
  return children;
};

export default Auth;
