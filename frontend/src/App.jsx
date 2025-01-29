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
import EntryDeleteConfirmation from "./pages/EntryDeleteConfirmation.jsx";
import ImageTable from "./pages/ImageTable.jsx";
import ImageEdit from "./pages/ImageEdit.jsx";
import ImageCreate from "./pages/ImageCreate.jsx";
import ImageDeleteConfirmation from "./pages/ImageDeleteConfirmation.jsx";

const IS_LOGGED_IN_FRONTEND = true;
//TODO: add error page for forbidden pages

function App() {
  return (
    <>
      <div className="main-grid">
        <Navbar />
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/Entry/:ID/Edit"
              element={IS_LOGGED_IN_FRONTEND ? <EntryEdit /> : <Home />}
            />
            <Route
              path="/Entry/:ID/Delete"
              element={
                IS_LOGGED_IN_FRONTEND ? <EntryDeleteConfirmation /> : <Home />
              }
            />
            <Route path="/Entry/:ID" element={<Entry />} />
            <Route
              path="/EntryCreate"
              element={IS_LOGGED_IN_FRONTEND ? <EntryCreate /> : <Home />}
            />
            <Route path="/Images" element={<ImageTable />} />
            <Route
              path="/Images/:ID/Edit"
              element={IS_LOGGED_IN_FRONTEND ? <ImageEdit /> : <Home />}
            />
            <Route
              path="/Images/:ID/Delete"
              element={
                IS_LOGGED_IN_FRONTEND ? <ImageDeleteConfirmation /> : <Home />
              }
            />
            <Route
              path="/Images/Create"
              element={IS_LOGGED_IN_FRONTEND ? <ImageCreate /> : <Home />}
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
