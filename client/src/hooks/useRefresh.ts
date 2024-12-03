import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "./useAuth";
import { setAuth } from "@/features/auth/authSlice";

const useRefresh = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { accesstoken } = useAuth();
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const json = await response.json();
    dispatch(setAuth(json));
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        setIsLoading(false);
      }
    };

    !accesstoken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return { isLoading };
};

export default useRefresh;
