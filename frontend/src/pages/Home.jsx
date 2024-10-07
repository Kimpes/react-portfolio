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
        <h2>A Selection of Works</h2>
        <ul className="portfolio-entries">
          {(!!portfolioEntries && portfolioEntries).map((n) => {
            return (
              <li key={n.ID} className="portfolio-entry-card">
                <div className="portfolio-image-container hasShadow">
                  <img src={`../../public/images/${n.thumbnail}`} alt="" />
                </div>
                <div className="portfolio-info">
                  <a href={"/Entry/" + n.ID}>
                    <h3>{n.title}</h3>
                  </a>
                  <div className="portfolio-type">{n.type}</div>
                  <p>{n.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
