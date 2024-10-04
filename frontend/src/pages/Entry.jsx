import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { ID: queryID } = useParams();
  const [portfolioEntry, setPortfolioEntry] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolioEntry(ID) {
      try {
        const res = await fetch("http://localhost:5000/Entry/" + ID);
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

    async function fetchImagesByEntry(ID) {
      try {
        const res = await fetch("http://localhost:5000/imagesByEntry/" + ID);
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await res.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }

    fetchPortfolioEntry(queryID);
    fetchImagesByEntry(queryID);
  }, [queryID]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!portfolioEntry) {
    return <p>Loading...</p>; // Shows a loading message while the data is fetched
  }

  return (
    <>
      <main>
        <h1>Single entry here</h1>
        <ul>
          {!!portfolioEntry && (
            <div key={portfolioEntry.ID}>
              <h1>{portfolioEntry.title}</h1>
              <p>{portfolioEntry.description}</p>
              <p>{portfolioEntry.ID}</p>
              {!!images && (
                <div className="imagesContainer">
                  {images.map((image) => (
                    <div key={image.ID}>
                      <p>{image.image_path}</p>
                      <img
                        src={`../../public/images/${image.image_path}`}
                        alt={image.alt_text}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ul>
      </main>
    </>
  );
}
