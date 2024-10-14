import "./App.css";
import Navbar from "./sections/Navbar/Navbar.jsx";
import Footer from "./sections/Footer/Footer.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Entry from "./pages/Entry.jsx";
import EntryEdit from "./pages/EntryEdit.jsx";
import NoPage from "./pages/NoPage.jsx";

function App() {
  return (
    <>
      <div className="main-grid">
        <Navbar />
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Entry/:ID/Edit" element={<EntryEdit />} />
            <Route path="/Entry/:ID" element={<Entry />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
