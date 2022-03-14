import { Navigate, Outlet, Route, RoutesProps, useLocation } from "react-router"
import store from "../store/store";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  // const isAuth = false;
  const isAuth = store.getState().users['isAuth'];

  if (isAuth) {
    return children;
  }
  return <Navigate to='/signin' state={ {from: location} } />;
}

