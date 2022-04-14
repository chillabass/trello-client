import React from 'react';
import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from '../hook/redux';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isAuth = useAppSelector(state => state.users.isAuth);

  if (isAuth) {
    return children;
  }
  return <Navigate to='/signin' state={{ from: location }} />;
};

const myAwesomeHOC = (Component: React.FC): React.FC => {
  return (props) => {
    const location = useLocation();
    const isAuth = useAppSelector(state => state.users.isAuth);
    if (!isAuth) {
      return <Navigate to='/signin' state={{ from: location }} />;;
    }
    return (
      <Component {...props} />
    )
  };
}