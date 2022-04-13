import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from '../hook/redux';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isAuth = useAppSelector(state => state.users.isAuth);
  // const isAuth = localStorage.getItem('token');

  if (isAuth) {
    return children;
  }
  return <Navigate to='/signin' state={{ from: location }} />;
};
