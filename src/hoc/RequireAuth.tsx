import React, { ReactChild, ReactNode } from "react";
import { Navigate, useLocation } from "react-router"
import store from "../store/store";

export const RequireAuth: React.FC<{children: ReactNode | ReactChild}> = ({children}) => {
  const location = useLocation();
  const isAuth = false;
  // const isAuth = store.getState().users['isAuth'];

  return isAuth ?
    children :
    <Navigate to='/signin' state={ {from: location} } />;
}