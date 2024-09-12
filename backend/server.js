const express = require("express");
const app = express();
const humans = [
  {
    name: "dave",
    age: 25,
  },
  {
    name: "brave",
    age: 46,
  },
  {
    name: "misbehave",
    age: 13,
  },
];

app.get("/humans", (rec, res) => {
  res.json(humans);
});

app.listen(5000);
