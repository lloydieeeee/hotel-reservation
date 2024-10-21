import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";

import AdminMainPage from "./pages/admin";
import AdminDashboardPage from "./pages/admin/dashboard/AdminDashboardPage";
import UserMainPage from "./pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainPage />,
  },
  {
    path: "/admin",
    element: <AdminMainPage />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
