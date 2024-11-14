import "./App.css";
import Navbar from "./sections/Navbar/Navbar.jsx";
import Footer from "./sections/Footer/Footer.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Entry from "./pages/Entry.jsx";
import EntryEdit from "./pages/EntryEdit.jsx";
import NoPage from "./pages/NoPage.jsx";
import EntryCreate from "./pages/EntryCreate.jsx";
import DeleteConfirmation from "./pages/DeleteConfirmation.jsx";
import ImageTable from "./pages/ImageTable.jsx";
import ImageEdit from "./pages/ImageEdit.jsx";

function App() {
  return (
    <>
      <div className="main-grid">
        <Navbar />
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Entry/:ID/Edit" element={<EntryEdit />} />
            <Route path="/Entry/:ID/Delete" element={<DeleteConfirmation />} />
            <Route path="/Entry/:ID" element={<Entry />} />
            <Route path="/EntryCreate" element={<EntryCreate />} />
            <Route path="/Images" element={<ImageTable />} />
            <Route path="/Images/Edit/:ID" element={<ImageEdit />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
