import { RootState } from "@/app/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { accesstoken, csrftoken } = useSelector(
    (state: RootState) => state.auth
  );

  return useMemo(() => ({ accesstoken, csrftoken }), [accesstoken, csrftoken]);
};

export default useAuth;
