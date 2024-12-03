import { Link, useLocation } from "react-router-dom";

import { Bed, BookPlus, Home, Hotel, Settings, Users } from "lucide-react";

export default function SideBarDesktop() {
  const { pathname } = useLocation();

  const linkStyle = (activeLink: string) => {
    const isActive = pathname === activeLink;
    const defaultStyle =
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
    const activeStyle =
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
    return isActive ? activeStyle : defaultStyle;
  };

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      href: "/admin/customers",
      label: "Customers",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/admin/rooms",
      label: "Rooms",
      icon: <Bed className="h-4 w-4" />,
    },
    {
      href: "/admin/reservations",
      label: "Reservations",
      icon: <BookPlus className="h-4 w-4" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Hotel className="h-6 w-6" />
            <span>Hotel System</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link, index) => (
              <Link key={index} to={link.href} className={linkStyle(link.href)}>
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
