import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Authenticate = (props) => {
  const user = useSelector(state => state.auth.user);
  const location = useLocation()
  if (!user.login){
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return props.children;
}

export default Authenticate;