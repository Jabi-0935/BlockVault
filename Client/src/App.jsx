import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";




function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <NavBar />
        <Hero/>
      </div>
    </>
  );
}

export default App;
