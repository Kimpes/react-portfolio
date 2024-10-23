import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { ID: queryID } = useParams();
  const [portfolioEntry, setPortfolioEntry] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  function handleImageTypeChange(imageID, newType) {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.ID === imageID ? { ...image, type: newType } : image
      )
    );
  }

  // Function to handle form submission (with help from chatGPT)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(event.target); // Collect form data
      console.log(formData);
      const response = await fetch(
        `http://localhost:5000/Entry/${portfolioEntry.ID}/Edit`,
        {
          method: "POST",
          body: formData, // Sending form data
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update portfolio entry.");
      }
      // If the submission is successful, navigate back to the entry page
      navigate(`/Entry/${portfolioEntry.ID}`);
    } catch (error) {
      console.error(error);
      setError("Failed to update the entry.");
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
          <form onSubmit={handleSubmit}>
            <div className="portfolio-entry-edit" key={portfolioEntry.ID}>
              <div className="input-pair">
                <label htmlFor="title">Title</label>
                <input
                  className="title"
                  type="text"
                  name="title"
                  value={portfolioEntry.title}
                  placeholder="Title"
                  required={true}
                  onChange={(e) =>
                    setPortfolioEntry({
                      ...portfolioEntry,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-pair">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  name="type"
                  value={portfolioEntry.type}
                  required={true}
                  onChange={(e) =>
                    setPortfolioEntry({
                      ...portfolioEntry,
                      type: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-pair">
                <label htmlFor="description">Short Summary</label>
                <textarea
                  name="description"
                  value={portfolioEntry.description}
                  placeholder="Description"
                  id="description"
                  rows={3}
                  required={true}
                  onChange={(e) =>
                    setPortfolioEntry({
                      ...portfolioEntry,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="input-pair">
                <label htmlFor="additional_description">
                  Longer Description
                </label>
                <textarea
                  name="additional_description"
                  value={portfolioEntry.additional_description}
                  placeholder="Additional Description"
                  id="additional-description"
                  rows={10}
                  required={true}
                  onChange={(e) =>
                    setPortfolioEntry({
                      ...portfolioEntry,
                      additional_description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="input-pair">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  name="link"
                  value={portfolioEntry.link}
                  required={true}
                  onChange={(e) =>
                    setPortfolioEntry({
                      ...portfolioEntry,
                      link: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-pair">
                <label htmlFor="thumbnail_id">Thumbnail</label>
                <input
                  type="text"
                  name="thumbnail_id"
                  value={portfolioEntry.thumbnail_id}
                  required={true}
                  onChange={(e) =>
                    setPortfolioEntry({
                      ...portfolioEntry,
                      thumbnail_id: e.target.value,
                    })
                  }
                />
              </div>
              {!!portfolioEntry.images && (
                <div className="portfolio-entry-images-edit">
                  <h2>Images</h2>
                  {portfolioEntry.images.map((image) => (
                    <div
                      className="portfolio-entry-image-container"
                      key={image.ID}
                    >
                      <div className="input-pair">
                        <label htmlFor="image_path">Image Path</label>
                        <input
                          type="text"
                          name="image_path"
                          value={image.image_path}
                          placeholder="Image Path"
                        />
                      </div>
                      <div className="input-pair">
                        <label htmlFor="alt_text">Alt Text</label>
                        <input
                          type="text"
                          name="alt_text"
                          value={image.alt_text}
                          placeholder="Alt Text"
                        />
                      </div>
                      <div className="input-pair">
                        <label htmlFor="type">Type</label>
                        <select
                          name="type"
                          value={image.type}
                          onChange={(e) =>
                            handleImageTypeChange(image.ID, e.target.value)
                          }
                        >
                          <option value="small">Small</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="link-container">
              <button
                type="submit"
                className="btn btn-primary clickable large hoverShadow"
              >
                Submit Changes
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}
