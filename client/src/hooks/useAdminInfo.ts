import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInformation } from "@/features/user/userSlice";
import { useFetchAdminInfoQuery } from "@/app/services/user";

export const useAdminInfo = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useFetchAdminInfoQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setInformation(data));
    }
  }, [dispatch, data]);
};
