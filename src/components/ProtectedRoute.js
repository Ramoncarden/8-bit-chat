import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, session }) => {
  return session ? children : <Navigate to={'../users/login'} />;
};

export default ProtectedRoute;
