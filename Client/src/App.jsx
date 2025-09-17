import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Auth from "./pages/Auth";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Transactions from "./pages/Transactions";
import { AssetProvider } from "./context/DashContext";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "/auth", element: <Auth /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <AssetProvider>
              <Dashboard />
            </AssetProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "/transaction/:id",
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
