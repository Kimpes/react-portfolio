const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");

app.use(cors());

const portfolioEntries = [
  {
    ID: 1,
    title: "This current website",
    description:
      "This current website that you are viewing was built in React.js and Express.js. It's deployed on AWS and connects to a database of portfolio entries via SQLite",
    image: "/portfolio_images/Coloured Dot Apple.jpg",
  },
  {
    ID: 2,
    title: "A copy of the previous entry",
    description:
      "This current website that you are viewing was built in React.js and Express.js. It's deployed on AWS and connects to a database of portfolio entries via SQLite",
    image: "/portfolio_images/Coloured Dot Apple.jpg",
  },
];

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

app.listen(5000);
console.log("running");

// TODO
// - tackle running the server and app in one command
