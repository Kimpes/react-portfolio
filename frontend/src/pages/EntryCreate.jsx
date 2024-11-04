import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [portfolioEntry, setPortfolioEntry] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllImages() {
      try {
        const res = await fetch("http://localhost:5000/images");
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

    fetchAllImages();
  }, []);

  function handleThumbnailChange(imageID) {
    setPortfolioEntry((prevPortfolioEntry) => ({
      ...prevPortfolioEntry,
      thumbnail_id: parseInt(imageID),
    }));
  }
  // Function to handle form submission (with help from chatGPT)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(event.target); // Collect form data
      console.log(formData);
      const response = await fetch(`http://localhost:5000/Entry`, {
        method: "POST",
        body: formData, // Sending form data
      });
      if (!response.ok) {
        throw new Error("Failed to create portfolio entry.");
      }
      // If the submission is successful, navigate to the home page
      navigate(`/`);
    } catch (error) {
      console.error(error);
      setError("Failed to create the entry.");
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="portfolio-entry-edit">
            <div className="input-pair">
              <label htmlFor="title">Title</label>
              <input
                className="title"
                type="text"
                name="title"
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
              <label htmlFor="portfolio_type">Type</label>
              <input
                type="text"
                name="portfolio_type"
                required={true}
                onChange={(e) =>
                  setPortfolioEntry({
                    ...portfolioEntry,
                    portfolio_type: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-pair">
              <label htmlFor="creation_date">Creation Year</label>
              <input
                type="number"
                name="creation_date"
                required={true}
                onChange={(e) =>
                  setPortfolioEntry({
                    ...portfolioEntry,
                    creation_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-pair">
              <label htmlFor="description">Short Summary</label>
              <textarea
                name="description"
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
              <label htmlFor="additional_description">Longer Description</label>
              <textarea
                name="additional_description"
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
              <select
                name="thumbnail_id"
                required={true}
                onChange={(e) => handleThumbnailChange(e.target.value)}
              >
                {images.map((image) => (
                  <option key={image.ID} value={image.ID}>
                    {image.image_path}
                  </option>
                ))}
              </select>
              <div className="preview-thumbnail">
                {!!portfolioEntry &&
                  portfolioEntry.thumbnail_id &&
                  (() => {
                    const selectedImage = images?.find(
                      (img) => img.ID === portfolioEntry.thumbnail_id
                    );
                    console.log(portfolioEntry);
                    return (
                      selectedImage && (
                        <img
                          src={`../../public/images/${selectedImage.image_path}`}
                          alt=""
                        />
                      )
                    );
                  })()}
              </div>
            </div>
          </div>
          <div className="link-container">
            <button
              type="submit"
              className="btn btn-primary clickable large hoverShadow"
            >
              Submit Entry
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
