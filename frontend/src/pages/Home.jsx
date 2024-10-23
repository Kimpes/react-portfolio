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

    fetchAllPortfolioEntries();
  }, []);

  return (
    <>
      <main>
        <section id="introduction">
          <div className="introduction-text">
            <h2>The Ever Great Developer & Designer</h2>
            <h1 className="hasShadow">Filip Gustafsson</h1>
            <div className="contact-combo">
              <a href="/#contact">
                <button className="btn btn-primary clickable large hoverShadow">
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
                <a
                  key={n.portfolio_id}
                  href={"/Entry/" + n.portfolio_id}
                  className="hoverShadow small clickable"
                >
                  <li className="preview-portfolio-entry-card">
                    <div className="preview-portfolio-image-container">
                      <img
                        src={`../../public/images/${n.image_path}`}
                        alt={n.alt_text}
                      />
                    </div>
                    <div className="preview-portfolio-info">
                      <div className="title-and-tag">
                        <h3>{n.title}</h3>
                        <div className="btn btn-primary">
                          {n.portfolio_type}
                        </div>
                      </div>
                      <p>{n.description}</p>
                    </div>
                  </li>
                </a>
              );
            })}
          </ul>
        </section>
        <section id="contact">
          <div className="contact-container">
            <div className="contact-left">
              <h2>Feel free to contact me!</h2>
            </div>
            <div className="contact-right">
              <p>You can easily reach me through my email</p>
              <a
                href="mailto:gustafssonfilip@hotmail.com"
                className="hoverShadow"
              >
                gustafssonfilip@hotmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
