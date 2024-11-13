import SideBar from "@/components/common/SideBar";
import PrivateOutlet from "@/utils/PrivateOutlet";

function AdminMainPage() {
  return (
    <SideBar>
      <PrivateOutlet />
    </SideBar>
  );
}

export default AdminMainPage;
