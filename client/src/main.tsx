import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";

import { ThemeProvider } from "./components/shared/ThemeProvider";

// layouts
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import PersistentLayout, { persistentLoader } from "./layouts/PersistentLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// pages
const AdminDashboardPage = lazy(() => import("./pages/admin/dashboard"));
const AdminCustomersPage = lazy(() => import("./pages/admin/customers"));
const AdminRoomsPage = lazy(() => import("./pages/admin/rooms"));
const AdminReservationsPage = lazy(() => import("./pages/admin/reservations"));
const AdminSignInPage = lazy(() => import("./pages/admin/sign-in"));

import NotFound from "./components/shared/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/sign-in" />} />
        <Route path="sign-in" element={<AdminSignInPage />} />

        <Route element={<PersistentLayout />} loader={persistentLoader}>
          <Route element={<PrivateLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="rooms" element={<AdminRoomsPage />} />
            <Route path="reservations" element={<AdminReservationsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="customer" element={<CustomerLayout />}>
        <Route index element={<div>Home</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
