import SideBarDesktop from "./SideBarDesktop";
import SideBarMobile from "./SideBarMobile";

import { Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBarDesktop />
      <div className="flex flex-col">
        <SideBarMobile />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
