import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "../store/hooks";

type Props = {
  children: any;
};

const RequireLogin = ({ children }: Props) => {
  const isLoggedIn = useStoreSelector((state) => state.user.loggedIn);
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export default RequireLogin;
