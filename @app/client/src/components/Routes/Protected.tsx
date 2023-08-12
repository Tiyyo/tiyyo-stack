import AppContext from "../../context/AppContext";
import useValidToken from "../../hooks/useValidToken";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  // const isAuth = useValidToken();
  const isAuth = useContext(AppContext);

  // const isAuth = true;

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default Protected;
