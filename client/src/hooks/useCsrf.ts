import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchCsrfTokenQuery } from "@/app/services/auth";
import { setCsrf } from "@/features/auth/authSlice";

export const useCsrf = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useFetchCsrfTokenQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCsrf(data));
    }
  }, [dispatch, data]);
};
