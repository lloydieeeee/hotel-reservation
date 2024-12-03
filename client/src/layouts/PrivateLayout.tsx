import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Suspense } from "react";

function PrivateLayout() {
  const { accesstoken } = useAuth();
  const location = useLocation();

  return accesstoken ? (
    <Suspense fallback="Loading...">
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/admin/sign-in" state={{ from: location }} replace />
  );
}

export default PrivateLayout;
