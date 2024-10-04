import { useState, useEffect } from "react";

export default function Home() {
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
      <main>
        <h1>Entries</h1>
        <ul>
          {(!!portfolioEntries && portfolioEntries).map((n) => {
            return (
              <li key={n.ID}>
                <a href={"/Entry/" + n.ID}>
                  <h1>{n.title}</h1>
                </a>
                <p>{n.description}</p>
                <p>{n.ID}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
