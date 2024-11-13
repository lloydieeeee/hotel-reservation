import { RootState } from "@/app/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const selectAccessToken = (state: RootState) => state.auth.accesstoken;
  const accesstoken = useSelector(selectAccessToken);

  return useMemo(() => ({ accesstoken }), [accesstoken]);
};
