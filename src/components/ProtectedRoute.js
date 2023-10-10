import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ children, loggedIn }) => {
  let location = useLocation();
  if (!loggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRouteElement;
