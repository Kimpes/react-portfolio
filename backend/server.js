const express = require("express");
const app = express();
const cors = require("cors");

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
  res.json(portfolioEntries);
});

app.listen(5000);
console.log("running");
