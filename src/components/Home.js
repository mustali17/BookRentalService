import React, { useEffect, useState } from "react";
import { AboutSection } from "./Home/AboutSection";
import { HeroSection } from "./Home/HeroSection";
import { Testimonials } from "./Home/Testimonial";

function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        "https://rentandread.onrender.com/api/record"
      );
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, []);

  return (
    <div className="App">
      <main className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-[#114B5F] min-h-screen">
        <HeroSection />
        <AboutSection />
        <Testimonials />
      </main>
    </div>
  );
}

export default App;