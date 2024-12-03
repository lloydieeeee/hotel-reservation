import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCsrfTokenQuery } from "@/app/services/auth";
import { setCsrf } from "@/features/auth/authSlice";

const useCsrf = () => {
  const { data, isSuccess } = useGetCsrfTokenQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCsrf(data));
    }
  }, [dispatch, data]);
};

export default useCsrf;
