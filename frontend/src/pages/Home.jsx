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
        <section id="introduction">
          <div className="introduction-text">
            <h2>
              The Ever Great <br></br>Developer & Designer
            </h2>
            <h1 className="hasShadow">Filip Gustafsson</h1>
            <div className="contact-combo">
              <a href="/#contact">
                <button className="btn btn-primary clickable large">
                  Contact Me
                </button>
              </a>
              <p className="small">Or scroll for more info</p>
            </div>
          </div>
          <div className="introduction-image">
            <img src="/Kim_Cat.png" alt="" />
          </div>
        </section>
        <section id="preview-portfolio">
          <h2>A Selection of Works</h2>
          <ul className="preview-portfolio-entries">
            {(!!portfolioEntries && portfolioEntries).map((n) => {
              return (
                <li key={n.ID} className="preview-portfolio-entry-card">
                  <div className="preview-portfolio-image-container hasShadow">
                    <img src={`../../public/images/${n.thumbnail}`} alt="" />
                  </div>
                  <div className="preview-portfolio-info">
                    <a href={"/Entry/" + n.ID}>
                      <h3>{n.title}</h3>
                    </a>
                    <div className="btn btn-primary">{n.type}</div>
                    <p>{n.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section id="contact"></section>
      </main>
    </>
  );
}
