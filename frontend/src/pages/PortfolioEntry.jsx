import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PortfolioEntry() {
  const { ID: queryID } = useParams();
  const [portfolioEntry, setPortfolioEntry] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolioEntry(ID) {
      try {
        const res = await fetch("http://localhost:5000/portfolioEntry/" + ID);
        if (!res.ok) {
          throw new Error("Failed to fetch portfolio entry");
        }
        const data = await res.json();
        setPortfolioEntry(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }

    fetchPortfolioEntry(queryID);
  }, [queryID]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!portfolioEntry) {
    return <p>Loading...</p>; // You can show a loading message while the data is fetched
  }

  return (
    <>
      <main>
        <h1>Single entry here</h1>
        <ul>
          {!!portfolioEntry && (
            <li key={portfolioEntry.ID}>
              <p>{portfolioEntry.title}</p>
              <p>{portfolioEntry.description}</p>
              <p>{portfolioEntry.ID}</p>
            </li>
          )}
        </ul>
      </main>
    </>
  );
}
