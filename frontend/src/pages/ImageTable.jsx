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
              <div key={image.ID} className="image-cell sub-shadow">
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
            <a href="/Images/Create">
              <button className="btn btn-primary clickable large hoverShadow">
                Upload New Image
              </button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
