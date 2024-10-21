import SideBar from "@/components/common/SideBar";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Outlet } from "react-router-dom";

function AdminMainPage() {
  return (
    <ThemeProvider>
      <SideBar>
        <Outlet />
      </SideBar>
    </ThemeProvider>
  );
}

export default AdminMainPage;
