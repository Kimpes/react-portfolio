import { useState, useEffect } from "react";

export default function Home() {
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
      <main>
        <h1>Entries</h1>
        <ul>
          {(!!portfolioEntries && portfolioEntries).map((n) => {
            return (
              <li key={n.ID}>
                <a href={"/Entry/" + n.ID}>
                  <h1>{n.title}</h1>
                </a>
                <img src={`../../public/images/${n.thumbnail}`} alt="" />
                <p>{n.description}</p>
                <p>{n.ID}</p>
              </li>
            );
          })}
        </ul>
        <ul>
          {(!!images && images).map((n) => {
            return (
              <li key={n.ID}>
                <p>{n.image_path}</p>
                <p>{n.ID}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
