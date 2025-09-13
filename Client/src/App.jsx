import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Auth from "./pages/Auth";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
      { path: "/auth", element: <Auth /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
