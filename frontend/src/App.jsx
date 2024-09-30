import "./App.css";
import Navbar from "./sections/Navbar/Navbar.jsx";
import { useState, useEffect } from "react";

function App() {
  const [portfolioEntries, setPortfolioEntries] = useState([]);

  useEffect(() => {
    async function fetchAllPortfolioEntries() {
      await fetch("http://localhost:5000/portfolioEntries")
        .then((res) => res.json())
        .then((data) => {
          setPortfolioEntries(data);
        });
    }

    fetchAllPortfolioEntries();
  }, []);

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
