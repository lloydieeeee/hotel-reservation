import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";

import { ThemeProvider } from "./components/common/ThemeProvider";

import AdminMainPage from "./pages/admin";
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminCustomersPage from "./pages/admin/customers";
import AdminRoomsPage from "./pages/admin/rooms";
import AdminReservationsPage from "./pages/admin/reservations";
import AdminSignInPage from "./pages/admin/sign-in";
import UserMainPage from "./pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainPage />,
  },
  {
    path: "/admin/sign-in",
    element: <AdminSignInPage />,
  },
  {
    path: "/admin",
    element: <AdminMainPage />,
    children: [
      {
        index: true,
        loader: () => redirect("/admin/dashboard"),
      },
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "customers",
        element: <AdminCustomersPage />,
      },
      {
        path: "rooms",
        element: <AdminRoomsPage />,
      },
      {
        path: "reservations",
        element: <AdminReservationsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
