import { useEffect, useState } from "react";

import SideBar from "@/components/shared/SideBar";
import { redirect, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/features/auth/authSlice";
import Spinner from "@/components/shared/Spinner";
import useCsrf from "@/hooks/useCsrf";

export const persistentLoader = async () => {
  const response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
    credentials: "include",
  });

  if (!response.ok) {
    return redirect("/admin/sign-in");
  }

  const data = response.json();

  return data;
};

function PersistentLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const loader = useLoaderData();
  const dispatch = useDispatch();

  useCsrf();

  useEffect(() => {
    if (loader) {
      dispatch(setAuth(loader));
      setIsLoading(false);
    }
  }, [loader]);

  return isLoading ? (
    <main className="min-h-screen grid place-items-center">
      <Spinner lg />
    </main>
  ) : (
    <SideBar />
  );
}

export default PersistentLayout;
