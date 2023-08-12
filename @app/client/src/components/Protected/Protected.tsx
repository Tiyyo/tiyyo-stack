import useValidToken from "../../hooks/useValidToken";
import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  //   const isAuth = useValidToken();
  const isAuth = true;

  return isAuth ? <>{children}</> : "";
};

export default Protected;
