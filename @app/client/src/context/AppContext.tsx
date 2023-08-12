import React, { createContext, useEffect } from "react";
import useValidToken from "../hooks/useValidToken";

const AppContext = createContext({});

export const AppContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // use useReducer to manage state if state become more complex
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<{ userId: string } | null>(null);
  const { isAuth: isUserStillAuth, user: updatedUserInfos } = useValidToken();

  const value = { isAuth, setIsAuth, user, setUser };

  // we need to maintain the state of the user in the context
  // so that we can access it from anywhere in the app

  useEffect(() => {
    setIsAuth(isUserStillAuth);
    setUser(updatedUserInfos);
  }, [user, isUserStillAuth]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
