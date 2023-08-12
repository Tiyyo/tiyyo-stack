// check if user have a valid token present in local storage

import { useCallback, useEffect, useState } from "react";

function useValidToken() {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const token = localStorage.getItem("accessToken");

  if (!token) setIsAuth(false);

  const isValid = useCallback(async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "auth/current",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      const user = await response.json();
      user.userId ? setIsAuth(true) : setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // useEffect(() => {
  //   isValid();
  // }, [isValid]);

  return isAuth;
}

export default useValidToken;
