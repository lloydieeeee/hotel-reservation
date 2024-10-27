import SideBar from "@/components/common/SideBar";
import { Outlet } from "react-router-dom";

function AdminMainPage() {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
}

export default AdminMainPage;
