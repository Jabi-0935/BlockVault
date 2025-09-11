import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#0d1216]">
        <NavBar />
        <Hero />
      </div>
    </>
  );
}

export default App;
