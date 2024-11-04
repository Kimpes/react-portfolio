const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");
const multer = require("multer");
const upload = multer();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/portfolioEntries", (rec, res) => {
  db.getAllPortfolioEntries((error, portfolioEntries) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve portfolio entries." });
    } else {
      res.status(200).json(portfolioEntries);
      console.log("Successfully retrieved portfolio entries.");
      console.log(portfolioEntries);
    }
  });
});

app.get("/Entry/:ID", (rec, res) => {
  const ID = rec.params.ID;
  db.getPortfolioEntryByID(ID, (error, portfolioEntryData) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve portfolio entry." });
    } else {
      console.log(portfolioEntryData);
      const portfolioEntry = {
        ID: portfolioEntryData[0].portfolio_id, // Take portfolio data from the first entry
        title: portfolioEntryData[0].title,
        description: portfolioEntryData[0].description,
        portfolio_type: portfolioEntryData[0].portfolio_type,
        creation_date: portfolioEntryData[0].creation_date,
        thumbnail_id: portfolioEntryData[0].thumbnail_id,
        additional_description: portfolioEntryData[0].additional_description,
        link: portfolioEntryData[0].link,
        images: portfolioEntryData.map((entry) => ({
          ID: entry.image_id,
          image_path: entry.image_path,
          alt_text: entry.alt_text,
          type: entry.image_type,
        })), // Map over all entries to collect images
      };

      res.status(200).json(portfolioEntry);
      console.log("Successfully retrieved portfolio entry.");
      console.log(portfolioEntry);
    }
  });
});

app.get("/images", (rec, res) => {
  db.getAllImages((error, images) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve images." });
    } else {
      res.status(200).json(images);
      console.log("Successfully retrieved images.");
      console.log(images);
    }
  });
});

app.get("/imagesByEntry/:ID", (rec, res) => {
  const ID = rec.params.ID;
  db.getImagesByEntryID(ID, (error, images) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve images." });
    } else {
      res.status(200).json(images);
      console.log("Successfully retrieved images.");
      console.log(images);
    }
  });
});

app.post("/Entry/:ID/Edit", upload.none(), (rec, res) => {
  const ID = rec.params.ID;
  const changes = {
    ID,
    title: rec.body.title,
    description: rec.body.description,
    portfolio_type: rec.body.portfolio_type,
    creation_date: rec.body.creation_date,
    thumbnail_id: rec.body.thumbnail_id,
    additional_description: rec.body.additional_description,
    link: rec.body.link,
  };
  db.updatePortfolioEntry(changes, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to update portfolio entry." });
    } else {
      res.status(200).json({ success: true, ID });
    }
  });
});

app.post("/Entry", upload.none(), (rec, res) => {
  const newEntry = {
    title: rec.body.title,
    description: rec.body.description,
    portfolio_type: rec.body.portfolio_type,
    creation_date: rec.body.creation_date,
    thumbnail_id: rec.body.thumbnail_id,
    additional_description: rec.body.additional_description,
    link: rec.body.link,
  };
  db.createPortfolioEntry(newEntry, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to add portfolio entry." });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

app.listen(5000);
console.log("running");
