import AppContext from "../../context/AppContext";
import useValidToken from "../../hooks/useValidToken";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const RedirectToHome = ({ children }: { children: React.ReactNode }) => {
  // const isAuth = useValidToken();
  const { isAuth } = useContext(AppContext);

  return isAuth ? <Navigate to="/" /> : <>{children}</>;
};

export default RedirectToHome;
