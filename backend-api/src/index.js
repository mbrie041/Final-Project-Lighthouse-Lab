const express = require("express");
const app = express();
const db = require('../db');
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
