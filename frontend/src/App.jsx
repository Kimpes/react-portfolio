import "./App.css";
import Navbar from "./sections/Navbar/Navbar.jsx";
import Footer from "./sections/Footer/Footer.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Entry from "./pages/Entry.jsx";
import NoPage from "./pages/NoPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Entry/:ID" element={<Entry />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
      <h1>hello</h1>
      <Footer />
    </>
  );
}

export default App;
