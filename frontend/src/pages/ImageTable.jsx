import { useState, useEffect } from "react";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchAllImages() {
      await fetch("http://localhost:5000/Images")
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
          console.log(images);
        });
    }

    fetchAllImages();
  }, []);

  return (
    <>
      <main>
        <section id="image-table">
          <h1>All images</h1>
          <div className="image-grid">
            {(!!images && images).map((image) => (
              <div key={image.ID} className="image-cell">
                <a href={`/Images/Edit/${image.ID}`}>
                  <img
                    src={`/images/${image.image_path}`}
                    alt={image.alt_text}
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="contact-combo">
            <a href="/EntryCreate">
              <button className="btn btn-primary clickable large hoverShadow">
                Create New Entry
              </button>
            </a>
          </div>
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
