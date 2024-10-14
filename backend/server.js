const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");

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
  db.getPortfolioEntryByID(ID, (error, portfolioEntry) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve portfolio entry." });
    } else {
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

app.post("/Entry/:ID/Edit", (rec, res) => {
  const ID = rec.params.ID;
  const changes = {
    ID,
    title: rec.body.title,
    description: rec.body.description,
    type: rec.body.type,
    thumbnail: rec.body.thumbnail,
    additionalDescription: rec.body.additionalDescription,
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

app.listen(5000);
console.log("running");
