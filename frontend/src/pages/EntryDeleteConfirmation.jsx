import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { ID: queryID } = useParams();
  const [portfolioEntry, setPortfolioEntry] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolioEntry(ID) {
      try {
        const res = await fetch("http://localhost:5000/Entry/" + ID);
        if (!res.ok) {
          throw new Error("Failed to fetch portfolio entry");
        }
        const data = await res.json();
        if (data && data.ID) {
          setPortfolioEntry(data);
          console.log(data);
        } else {
          setError("Portfolio entry not found");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }
    fetchPortfolioEntry(queryID);
  }, [queryID]);

  useEffect(() => {
    async function fetchThumbnailByEntry(ID) {
      if (!ID) return;
      try {
        const res = await fetch("http://localhost:5000/thumbnailByEntry/" + ID);
        if (!res.ok) {
          throw new Error("Failed to fetch thumbnail");
        }
        const data = await res.json();
        setThumbnail(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }
    fetchThumbnailByEntry(portfolioEntry?.thumbnail_id);
  }, [portfolioEntry]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      console.log("time to delete");
      const response = await fetch(
        `http://localhost:5000/Entry/${portfolioEntry.ID}/Delete`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete entry.");
      }
      // If the deletion is successful, navigate to the home page
      window.location.href = `/`;
    } catch (err) {
      console.log(err);
    }
  };

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
            <h3>Are you sure you want to delete the following entry?</h3>
            <ul className="preview-portfolio-entries">
              <li className="preview-portfolio-entry-card">
                {!!thumbnail && (
                  <div className="preview-portfolio-image-container small">
                    <img
                      src={`/images/${thumbnail.image_path}`}
                      alt={thumbnail.alt_text}
                    />
                  </div>
                )}
                <div className="preview-portfolio-info">
                  <div className="title-and-tag">
                    <h3>{portfolioEntry.title}</h3>
                    <div className="btn btn-primary">
                      {portfolioEntry.portfolio_type}
                    </div>
                  </div>
                  <p>{portfolioEntry.description}</p>
                </div>
              </li>
            </ul>
            <form onSubmit={handleDelete}>
              <div className="link-container">
                <a href={`/Entry/${portfolioEntry.ID}`}>
                  <button
                    type="button"
                    className="btn btn-primary clickable large hoverShadow"
                  >
                    Cancel
                  </button>
                </a>
                <button
                  type="submit"
                  className="btn btn-primary clickable large hoverShadow deletion"
                >
                  Confirm Deletion
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
