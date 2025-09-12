import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Auth from "./pages/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router =  createBrowserRouter([
  {
    path:"/",
    element:<Hero/>
  },
  {path:'/auth',
    element:<Auth/>
  }
])






function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <NavBar/>
        <RouterProvider router={router}/>

      </div>
    </>
  );
}

export default App;
