// check if user have a valid token present in local storage

import { useEffect, useState } from "react";
import getToken from "../utils/get.cookies";

function useValidToken() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<{ userId: string } | null>(null);

  const token = getToken();

  useEffect(() => {
    if (!token) return setIsAuth(false);
    async function checkToken() {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + "auth/current",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );
        const result = await response.json();
        if (result.userId) {
          setIsAuth(true);
          setUser({ userId: result.userId });
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkToken();
  }, [token]);
  console.log(isAuth, user, "USE VALID TOKEN");
  return { isAuth, user };
}

export default useValidToken;
