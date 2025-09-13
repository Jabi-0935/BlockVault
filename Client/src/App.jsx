import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Auth from "./pages/Auth";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


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
      {path:'/dashboard', 
      element:
      <ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
