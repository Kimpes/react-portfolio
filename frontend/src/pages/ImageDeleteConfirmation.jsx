//TODO: two deletion pages is excessive. Try to combine their functionality by making more generic functions.
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { ID: queryID } = useParams();
  const [image, setImage] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImage(ID) {
      try {
        const res = await fetch("http://localhost:5000/thumbnailByEntry/" + ID);
        if (!res.ok) {
          throw new Error("Failed to fetch image");
        }
        const data = await res.json();
        setImage(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }
    fetchImage(queryID);
  }, [queryID]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const imageData = { image_path: image.image_path };
      const response = await fetch(
        `http://localhost:5000/Image/${image.ID}/Delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete image.");
      }
      // If the deletion is successful, navigate to the image table
      window.location.href = `/Images`;
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!image) {
    return <p>Loading...</p>; // Shows a loading message while the data is fetched
  }

  return (
    <>
      <main>
        {!!image && (
          <div className="portfolio-entry" key={image.ID}>
            <h3>Are you sure you want to delete the following image?</h3>
            <ul className="preview-portfolio-entries">
              <li className="preview-portfolio-entry-card">
                {!!image && (
                  <div className="preview-portfolio-image-container small">
                    <img
                      src={`/images/${image.image_path}`}
                      alt={image.alt_text}
                    />
                    <h4>{image.alt_text}</h4>
                  </div>
                )}
              </li>
            </ul>
            <form onSubmit={handleDelete}>
              <div className="link-container">
                <a href={`/Images/${image.ID}/Edit`}>
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
