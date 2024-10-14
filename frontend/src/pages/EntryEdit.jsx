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
        {!!portfolioEntry && (
          <form
            action={`/portfolioEntry/edit/${portfolioEntry.ID}`}
            method="POST"
          >
            <div className="portfolio-entry-edit" key={portfolioEntry.ID}>
              <div className="input-pair">
                <label htmlFor="title">Title</label>
                <input
                  className="title"
                  type="text"
                  name="title"
                  defaultValue={portfolioEntry.title}
                  placeholder="Title"
                />
              </div>
              <div className="input-pair">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  name="type"
                  defaultValue={portfolioEntry.type}
                />
              </div>
              <div className="input-pair">
                <label htmlFor="description">Short Summary</label>
                <textarea
                  name="description"
                  defaultValue={portfolioEntry.description}
                  placeholder="Description"
                  id="description"
                  rows={3}
                ></textarea>
              </div>
              <div className="input-pair">
                <label htmlFor="additional_description">
                  Longer Description
                </label>
                <textarea
                  name="additional_description"
                  defaultValue={portfolioEntry.additional_description}
                  placeholder="Additional Description"
                  id="additional-description"
                  rows={10}
                ></textarea>
              </div>
              <div className="input-pair">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  name="link"
                  defaultValue={portfolioEntry.link}
                />
              </div>
              <div className="input-pair">
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                  type="text"
                  name="thumbnail"
                  defaultValue={portfolioEntry.thumbnail}
                />
              </div>
              {!!images && (
                <div className="portfolio-entry-images-edit">
                  <h2>Images</h2>
                  {images.map((image) => (
                    <div
                      className="portfolio-entry-image-container"
                      key={image.ID}
                    >
                      <div className="input-pair">
                        <label htmlFor="image_path">Image Path</label>
                        <input
                          type="text"
                          name="image_path"
                          defaultValue={image.image_path}
                          placeholder="Image Path"
                        />
                      </div>
                      <div className="input-pair">
                        <label htmlFor="alt_text">Alt Text</label>
                        <input
                          type="text"
                          name="alt_text"
                          defaultValue={image.alt_text}
                          placeholder="Alt Text"
                        />
                      </div>
                      <div className="input-pair">
                        <label htmlFor="type">Type</label>
                        <select name="type" value={image.type}>
                          <option value="small">Small</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        )}
      </main>
    </>
  );
}
