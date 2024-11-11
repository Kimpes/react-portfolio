import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { ID: queryID } = useParams();
  const [portfolioEntry, setPortfolioEntry] = useState();
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
        console.log(data);
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
    return <p>Loading...</p>; // Shows a loading message while the data is fetched
  }

  return (
    <>
      <main>
        {!!portfolioEntry && (
          <div className="portfolio-entry" key={portfolioEntry.ID}>
            <h1>{portfolioEntry.title}</h1>
            <p className="subtitle-small">{portfolioEntry.creation_date}</p>
            <p>{portfolioEntry.additional_description}</p>
            {!!portfolioEntry.images && portfolioEntry.images[0].ID && (
              <div className="portfolio-entry-images-grid">
                {portfolioEntry.images
                  .filter((image) => image.type !== "thumbnail")
                  .map((image) => (
                    <div
                      className="portfolio-entry-image-container"
                      key={image.ID}
                    >
                      <img
                        src={`/images/${image.image_path}`}
                        alt={image.alt_text}
                        className={`${image.type}`}
                      />
                    </div>
                  ))}
              </div>
            )}
            <div className="link-container">
              <a href={portfolioEntry.link}>
                <button className="btn btn-primary clickable large hoverShadow">
                  Link To Project
                </button>
              </a>
              <a href={`/Entry/${portfolioEntry.ID}/Edit`}>
                <button className="btn btn-primary clickable large hoverShadow">
                  Edit
                </button>
              </a>
              <a href={`/Entry/${portfolioEntry.ID}/Delete`}>
                <button className="btn btn-primary clickable large hoverShadow deletion">
                  Delete
                </button>
              </a>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
