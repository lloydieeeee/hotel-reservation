import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bed,
  BookPlus,
  CircleUser,
  Home,
  Hotel,
  Menu,
  Settings,
  Users,
} from "lucide-react";

import { useLogoutMutation } from "@/app/services/auth";
import { ThemeToggle } from "./ThemeToggle";

export default function SideBarMobile() {
  const { pathname } = useLocation();

  const linkStyle = (activeLink: string) => {
    const isActive = pathname === activeLink;

    const defaultStyle =
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
    const activeStyle =
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground";

    return isActive ? activeStyle : defaultStyle;
  };

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/admin/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/admin/rooms",
      label: "Rooms",
      icon: <Bed className="h-5 w-5" />,
    },
    {
      href: "/admin/reservations",
      label: "Reservations",
      icon: <BookPlus className="h-5 w-5" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const [logoutUser] = useLogoutMutation();
  const router = useNavigate();

  const handleLogout = async () => {
    await logoutUser(undefined)
      .unwrap()
      .then(() => {
        router("/admin/sign-in");
      });
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 mb-4 text-lg font-semibold"
            >
              <Hotel className="h-6 w-6" />
              Hotel System
            </Link>
            {links.map((link, index) => (
              <Link key={index} to={link.href} className={linkStyle(link.href)}>
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-end gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
