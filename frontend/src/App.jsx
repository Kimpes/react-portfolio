import "./App.css";
import Navbar from "./sections/Navbar/Navbar.jsx";
import Footer from "./sections/Footer/Footer.jsx";
import { useState, useEffect } from "react";

function App() {
  const [portfolioEntries, setPortfolioEntries] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchAllPortfolioEntries() {
      await fetch("http://localhost:5000/portfolioEntries")
        .then((res) => res.json())
        .then((data) => {
          setPortfolioEntries(data);
        });
    }
    async function fetchAllImages() {
      await fetch("http://localhost:5000/images")
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
        });
    }

    fetchAllPortfolioEntries();
    fetchAllImages();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <h1>Entries</h1>
        <ul>
          {(!!portfolioEntries && portfolioEntries).map((n) => {
            return (
              <li key={n.ID}>
                <p>{n.title}</p>
                <p>{n.description}</p>
                <p>{n.ID}</p>
              </li>
            );
          })}
        </ul>

        <h1>Images</h1>
        <ul>
          {(!!images && images).map((n) => {
            return (
              <li key={n.ID}>
                <p>{n.image_path}</p>
                <p>{n.alt_text}</p>
                <p>{n.ID}</p>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default App;
