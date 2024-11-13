import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function PrivateOutlet() {
  const accesstoken = useAuth();
  const location = useLocation();

  return accesstoken.accesstoken ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/sign-in" state={{ from: location }} />
  );
}

export default PrivateOutlet;
