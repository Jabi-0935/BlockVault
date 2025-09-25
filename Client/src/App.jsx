import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Auth from "./pages/Auth";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Transactions from "./pages/Transactions";
import { AssetProvider } from "./context/DashContext";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
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
            <AssetProvider>
              <Transactions />
            </AssetProvider>
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
