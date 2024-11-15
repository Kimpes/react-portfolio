import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { ID: queryID } = useParams();
  const [image, setImage] = useState();
  const [portfolioEntries, setPortfolioEntries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImage(ID) {
      try {
        const res = await fetch("http://localhost:5000/thumbnailByEntry/" + ID);
        if (!res.ok) {
          throw new Error("Failed to fetch image");
        }
        const data = await res.json();
        setImage(data);
        console.log(image);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }
    async function fetchAllPortfolioEntries() {
      //TODO: change this to only fetch titles and IDs? might be faster
      await fetch("http://localhost:5000/portfolioEntries")
        .then((res) => res.json())
        .then((data) => {
          setPortfolioEntries(data);
          console.log(portfolioEntries);
        });
    }

    fetchAllPortfolioEntries();
    fetchImage(queryID);
  }, [queryID]);

  const handleAssociatedEntryChange = (entry_id) => {
    const parsedEntryId = parseInt(entry_id);
    if (Number.isNaN(parsedEntryId)) {
      console.error("Invalid entry:", entry_id);
      return;
    }
    setImage({
      ...image,
      associated_entry_ID: parseInt(parsedEntryId),
    });
  };

  const handleSubmit = async (event) => {
    // Function to handle form submission (with help from chatGPT)
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(event.target); // Collect form data
      console.log(formData);
      const response = await fetch(
        `http://localhost:5000/Image/${image.ID}/Edit`,
        {
          method: "POST",
          body: formData, // Sending form data
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update portfolio image entry.");
      }
      // If the submission is successful, navigate back to the image table
      navigate(`/ImageTable`);
    } catch (error) {
      console.error(error);
      setError("Failed to update the image entry.");
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
        <form onSubmit={handleSubmit}>
          <div className="portfolio-entry-edit">
            {!!image && (
              <div className="portfolio-entry-images-edit">
                <div className="portfolio-entry-image-container">
                  <img
                    src={`/images/${image.image_path}`}
                    alt={image.alt_text}
                  />
                </div>
                <div className="input-pair">
                  <label htmlFor="image_path">Image Path</label>
                  <input
                    type="text"
                    name="image_path"
                    value={image.image_path}
                    placeholder="Image Path"
                    readOnly={true}
                  />
                </div>
                <div className="input-pair">
                  <label htmlFor="alt_text">Alt Text</label>
                  <input
                    type="text"
                    name="alt_text"
                    value={image.alt_text}
                    placeholder="Alt Text"
                    onChange={(e) =>
                      setImage({
                        ...image,
                        alt_text: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-pair">
                  <label htmlFor="type">Type</label>
                  <select
                    name="type"
                    value={image.type}
                    onChange={(e) =>
                      setImage({
                        ...image,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                    <option value="large">Thumbnail</option>
                  </select>
                </div>
                <div className="input-pair">
                  <label htmlFor="display_order">
                    Display Order (Optional)
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={image.display_order}
                    onChange={(e) =>
                      setImage({
                        ...image,
                        display_order: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="input-pair">
                  <label htmlFor="associated_entry_ID">
                    Associated Portfolio Entry
                  </label>
                  <select
                    name="associated_entry_ID"
                    value={image.associated_entry_ID}
                    required={true}
                    onChange={(e) =>
                      handleAssociatedEntryChange(e.target.value)
                    }
                  >
                    {portfolioEntries.map(
                      (
                        portfolioEntry //cycle through all portfolio entries titles
                      ) => (
                        <option
                          key={portfolioEntry.portfolio_id}
                          value={portfolioEntry.portfolio_id}
                        >
                          {portfolioEntry.title}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="link-container">
            <button
              type="submit"
              className="btn btn-primary clickable large hoverShadow"
            >
              Submit Changes
              {
                //add a cancel button
              }
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
